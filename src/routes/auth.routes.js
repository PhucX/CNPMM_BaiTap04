const express = require("express");
const { login } = require("../services/authService");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/login", (req, res) => {
  const result = login(req.body?.email, req.body?.password);

  if (!result) {
    return res.status(401).json({
      message: "Email hoac mat khau khong dung."
    });
  }

  return res.json(result);
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({
    user: req.user
  });
});

module.exports = router;
