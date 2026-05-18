const express = require("express");
const { requireAuth, requireMember } = require("../middleware/auth");
const {
  categories,
  promotions,
  listProducts,
  getProductBySlug,
  getRelatedProducts,
  getHomeCollections
} = require("../services/productService");

const router = express.Router();

router.use(requireAuth, requireMember);

router.get("/categories", (req, res) => {
  return res.json({
    items: categories
  });
});

router.get("/promotions", (req, res) => {
  return res.json({
    items: promotions
  });
});

router.get("/home", (req, res) => {
  return res.json(getHomeCollections());
});

router.get("/products", (req, res) => {
  return res.json(listProducts(req.query));
});

router.get("/products/:slug", (req, res) => {
  const product = getProductBySlug(req.params.slug);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm."
    });
  }

  return res.json({
    product,
    related: getRelatedProducts(product)
  });
});

module.exports = router;
