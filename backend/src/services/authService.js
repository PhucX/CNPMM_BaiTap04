const crypto = require("crypto");
const User = require("../models/User");

const TOKEN_TTL_SECONDS = 60 * 60 * 8;
const secret = process.env.AUTH_SECRET || "urbanstep-dev-secret";
const PASSWORD_PREFIX = "scrypt";

function base64UrlEncode(value) {
  return Buffer.from(JSON.stringify(value))
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function sign(payload) {
  return crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const hash = crypto.scryptSync(String(password || ""), salt, 64).toString("base64url");
  return `${PASSWORD_PREFIX}$${salt}$${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;

  if (!storedPassword.startsWith(`${PASSWORD_PREFIX}$`)) {
    return String(password || "") === storedPassword;
  }

  const [, salt, hash] = storedPassword.split("$");
  if (!salt || !hash) return false;

  const candidate = crypto.scryptSync(String(password || ""), salt, 64).toString("base64url");
  return safeEqual(candidate, hash);
}

function createToken(user) {
  const header = base64UrlEncode({ alg: "HS256", typ: "JWT" });
  const payload = base64UrlEncode({
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS
  });

  const signature = sign(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

async function verifyToken(token) {
  try {
    if (!token) return null;

    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) return null;

    const expectedSignature = sign(`${header}.${payload}`);

    if (!safeEqual(signature, expectedSignature)) return null;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.exp < Math.floor(Date.now() / 1000)) return null;

    const user = await User.findOne({ id: data.sub });
    return user ? sanitizeUser(user) : null;
  } catch {
    return null;
  }
}

function sanitizeUser(user) {
  const obj = user.toObject ? user.toObject() : user;
  const { password, _id, __v, ...rest } = obj;
  return rest;
}

async function login(email, password) {
  const user = await User.findOne({
    email: String(email || "").toLowerCase()
  });

  if (!user || !verifyPassword(password, user.password)) {
    return null;
  }

  if (!String(user.password || "").startsWith(`${PASSWORD_PREFIX}$`)) {
    user.password = hashPassword(password);
    if (typeof user.save === "function") {
      await user.save();
    }
  }

  return {
    token: createToken(user),
    user: sanitizeUser(user)
  };
}

module.exports = {
  login,
  verifyToken,
  sanitizeUser,
  hashPassword,
  verifyPassword
};
