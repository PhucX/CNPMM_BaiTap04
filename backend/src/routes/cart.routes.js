const express = require("express");
const { requireAuth, requireMember } = require("../middlewares/auth");
const cartController = require("../controllers/cartController");

const router = express.Router();

// Tất cả các route giỏ hàng yêu cầu Auth và role Member
router.use(requireAuth, requireMember);

router.get("/", cartController.getCart);
router.post("/items", cartController.addItem);
router.put("/items/:itemId", cartController.updateItem);
router.delete("/items/:itemId", cartController.removeItem);

module.exports = router;
