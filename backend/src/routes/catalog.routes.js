const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/categories", productController.getCategories);
router.get("/promotions", productController.getPromotions);
router.get("/home", productController.getHome);
router.get("/products", productController.getProducts);
router.get("/products/top", productController.getTopProducts);
router.get("/products/:slug", productController.getProductBySlug);

module.exports = router;
