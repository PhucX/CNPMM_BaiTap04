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
      message: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn."
    });
  }

  req.user = user;
  return next();
}

function requireMember(req, res, next) {
  if (req.user?.role !== "member") {
    return res.status(403).json({
      message: "Chỉ thành viên mới được truy cập trang bán hàng."
    });
  }

  return next();
}

module.exports = {
  requireAuth,
  requireMember
};
