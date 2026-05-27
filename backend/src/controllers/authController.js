const { login: authLogin } = require("../services/authService");

const login = async (req, res) => {
  const result = await authLogin(req.body?.email, req.body?.password);

  if (!result) {
    return res.status(401).json({
      message: "Email hoặc mật khẩu không đúng."
    });
  }

  return res.json(result);
};

const getMe = async (req, res) => {
  return res.json({
    user: req.user
  });
};

module.exports = {
  login,
  getMe
};
