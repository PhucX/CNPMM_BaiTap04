const crypto = require("crypto");
const { users } = require("../data/catalog");

const TOKEN_TTL_SECONDS = 60 * 60 * 8;
const secret = process.env.AUTH_SECRET || "urbanstep-dev-secret";

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;
  return safeUser;
}

function createToken(user) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: user.id,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS
    })
  );
  const unsignedToken = `${header}.${payload}`;

  return `${unsignedToken}.${sign(unsignedToken)}`;
}

function verifyToken(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [header, payload, signature] = parts;
  const unsignedToken = `${header}.${payload}`;
  const expectedSignature = sign(unsignedToken);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    return null;
  }

  try {
    const decodedPayload = JSON.parse(base64UrlDecode(payload));
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    const user = users.find((item) => item.id === decodedPayload.sub);
    return sanitizeUser(user);
  } catch (error) {
    return null;
  }
}

function login(email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const user = users.find(
    (item) => item.email.toLowerCase() === normalizedEmail && item.password === String(password || "")
  );

  if (!user) {
    return null;
  }

  return {
    token: createToken(user),
    user: sanitizeUser(user)
  };
}

module.exports = {
  login,
  verifyToken,
  sanitizeUser
};
