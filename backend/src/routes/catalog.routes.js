const express = require("express");
const { requireAuth, requireMember } = require("../middlewares/auth");
const productController = require("../controllers/productController");

const router = express.Router();

router.use(requireAuth, requireMember);

router.get("/categories", productController.getCategories);
router.get("/promotions", productController.getPromotions);
router.get("/home", productController.getHome);
router.get("/products", productController.getProducts);
router.get("/products/top", productController.getTopProducts);
router.get("/products/:slug", productController.getProductBySlug);

module.exports = router;
