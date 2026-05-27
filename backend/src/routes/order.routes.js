const express = require("express");
const { requireAuth, requireMember } = require("../middlewares/auth");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.use(requireAuth, requireMember);

router.get("/", orderController.getOrders);
router.post("/", orderController.createOrder);
router.post("/:orderId/cancel", orderController.cancelOrder);

module.exports = router;
