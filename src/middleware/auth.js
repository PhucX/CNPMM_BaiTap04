const { verifyToken } = require("../services/authService");

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

function requireAuth(req, res, next) {
  const user = verifyToken(getBearerToken(req));

  if (!user) {
    return res.status(401).json({
      message: "Phien dang nhap khong hop le hoac da het han."
    });
  }

  req.user = user;
  return next();
}

function requireMember(req, res, next) {
  if (req.user?.role !== "member") {
    return res.status(403).json({
      message: "Chi thanh vien moi duoc truy cap trang ban hang."
    });
  }

  return next();
}

module.exports = {
  requireAuth,
  requireMember
};
