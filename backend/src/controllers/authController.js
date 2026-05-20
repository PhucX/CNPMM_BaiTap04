const { login: authLogin } = require("../services/authService");

const login = (req, res) => {
  const result = authLogin(req.body?.email, req.body?.password);

  if (!result) {
    return res.status(401).json({
      message: "Email hoặc mật khẩu không đúng."
    });
  }

  return res.json(result);
};

const getMe = (req, res) => {
  return res.json({
    user: req.user
  });
};

module.exports = {
  login,
  getMe
};
