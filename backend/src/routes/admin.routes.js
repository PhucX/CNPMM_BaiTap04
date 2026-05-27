const express = require("express");
const { requireAuth, requireAdmin } = require("../middlewares/auth");
const adminController = require("../controllers/adminController");

const router = express.Router();

// Tất cả các route admin đều yêu cầu Auth và quyền Admin
router.use(requireAuth, requireAdmin);

router.get("/stats", adminController.getDashboardStats);
router.get("/products", adminController.getAllProducts);
router.post("/products", adminController.createProduct);
router.put("/products/:id", adminController.updateProduct);
router.delete("/products/:id", adminController.deleteProduct);

router.get("/orders", adminController.getAllOrders);
router.put("/orders/:orderId/status", adminController.updateOrderStatus);

router.get("/users", adminController.getAllUsers);

module.exports = router;
