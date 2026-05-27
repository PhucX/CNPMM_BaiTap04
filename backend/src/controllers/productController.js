const productService = require("../services/productService");
const Category = require("../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  return res.json({
    items: categories
  });
};

const getPromotions = async (req, res) => {
  const data = await productService.getHomeCollections();
  return res.json({
    items: data.promotions
  });
};

const getHome = async (req, res) => {
  const data = await productService.getHomeCollections();
  return res.json(data);
};

const getProducts = async (req, res) => {
  const data = await productService.listProducts(req.query);
  return res.json(data);
};

const getTopProducts = async (req, res) => {
  const data = await productService.getTopCollections(req.query.limit);
  return res.json(data);
};

const getProductBySlug = async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm."
    });
  }

  return res.json({
    product,
    related: await productService.getRelatedProducts(product)
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
