const productService = require("../services/productService");

const getCategories = (req, res) => {
  return res.json({
    items: productService.categories
  });
};

const getPromotions = (req, res) => {
  return res.json({
    items: productService.promotions
  });
};

const getHome = (req, res) => {
  return res.json(productService.getHomeCollections());
};

const getProducts = (req, res) => {
  return res.json(productService.listProducts(req.query));
};

const getTopProducts = (req, res) => {
  return res.json(productService.getTopCollections(req.query.limit));
};

const getProductBySlug = (req, res) => {
  const product = productService.getProductBySlug(req.params.slug);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm."
    });
  }

  return res.json({
    product,
    related: productService.getRelatedProducts(product)
  });
};

module.exports = {
  getCategories,
  getPromotions,
  getHome,
  getProducts,
  getTopProducts,
  getProductBySlug
};
