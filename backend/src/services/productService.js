const Product = require("../models/Product");
const Category = require("../models/Category");
const Promotion = require("../models/Promotion");
const { toNumber, toBoolean, toPositiveInteger, normalize } = require("../utils/helpers");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function enrichWithCategories(products) {
  const plainProducts = products.map(product => product.toObject ? product.toObject() : product);
  const categoryIds = [...new Set(plainProducts.map(product => product.categoryId).filter(Boolean))];
  const categories = await Category.find({ id: { $in: categoryIds } });
  const categoryMap = new Map(categories.map(category => [category.id, category]));

  return plainProducts.map(product => ({
    ...product,
    category: categoryMap.get(product.categoryId) || null
  }));
}

async function listProducts(query) {
  const page = toPositiveInteger(query.page, 1);
  const pageSize = Math.min(toPositiveInteger(query.pageSize, 12), 50);
  const search = normalize(query.search);
  const categoryId = query.category;
  const minPrice = toNumber(query.minPrice);
  const maxPrice = toNumber(query.maxPrice);
  const minRating = toNumber(query.minRating);
  const inStock = toBoolean(query.inStock);
  const isPromo = toBoolean(query.promo);
  const sort = query.sort || "newest";

  const filter = {};

  if (search) {
    const escapedSearch = escapeRegExp(search);
    filter.$or = [
      { name: { $regex: escapedSearch, $options: "i" } },
      { summary: { $regex: escapedSearch, $options: "i" } }
    ];
  }

  if (categoryId && categoryId !== "all") {
    filter.categoryId = categoryId;
  }

  if (minPrice !== null || maxPrice !== null) {
    filter.price = {};
    if (minPrice !== null) filter.price.$gte = minPrice;
    if (maxPrice !== null) filter.price.$lte = maxPrice;
  }

  if (minRating !== null) {
    filter.rating = { $gte: minRating };
  }

  if (inStock) {
    filter.stock = { $gt: 0 };
  }

  if (isPromo) {
    filter.discountPercent = { $gt: 0 };
  }

  let sortCriteria = { createdAt: -1 };
  if (sort === "best-selling") sortCriteria = { sold: -1 };
  if (sort === "price-asc") sortCriteria = { price: 1 };
  if (sort === "price-desc") sortCriteria = { price: -1 };
  if (sort === "rating") sortCriteria = { rating: -1 };
  if (sort === "most-viewed") sortCriteria = { viewCount: -1 };

  const total = await Product.countDocuments(filter);
  const items = await Product.find(filter)
    .sort(sortCriteria)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const enrichedItems = await enrichWithCategories(items);

  return {
    items: enrichedItems,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    hasMore: page * pageSize < total
  };
}

async function getProductBySlug(slug) {
  const product = await Product.findOne({ slug });
  if (!product) return null;
  
  const [enrichedProduct] = await enrichWithCategories([product]);
  return enrichedProduct;
}

async function getRelatedProducts(product, limit = 4) {
  const items = await Product.find({
    categoryId: product.categoryId,
    id: { $ne: product.id }
  }).limit(limit);
  return items;
}

async function getHomeCollections() {
  const promos = await Promotion.find({});
  return {
    promotions: promos
  };
}

async function getTopCollections(limit = 10) {
  const safeLimit = toPositiveInteger(limit, 10);
  
  const bestSelling = await Product.find({}).sort({ sold: -1 }).limit(safeLimit);
  const mostViewed = await Product.find({}).sort({ viewCount: -1 }).limit(safeLimit);

  return {
    bestSelling: await enrichWithCategories(bestSelling),
    mostViewed: await enrichWithCategories(mostViewed)
  };
}

module.exports = {
  listProducts,
  getProductBySlug,
  getRelatedProducts,
  getHomeCollections,
  getTopCollections
};
