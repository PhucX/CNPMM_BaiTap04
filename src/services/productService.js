const { categories, products, promotions } = require("../data/catalog");

function toNumber(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function toBoolean(value) {
  return value === true || value === "true" || value === "1" || value === "on";
}

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function decorateProduct(product) {
  const category = categories.find((item) => item.id === product.categoryId);
  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return {
    ...product,
    category,
    discountPercent,
    inStock: product.stock > 0
  };
}

function sortProducts(items, sort) {
  const sorted = [...items];

  switch (sort) {
    case "price-asc":
      sorted.sort((first, second) => first.price - second.price);
      break;
    case "price-desc":
      sorted.sort((first, second) => second.price - first.price);
      break;
    case "best-selling":
      sorted.sort((first, second) => second.sold - first.sold);
      break;
    case "rating":
      sorted.sort((first, second) => second.rating - first.rating);
      break;
    case "newest":
    default:
      sorted.sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
      break;
  }

  return sorted;
}

function listProducts(filters = {}) {
  const keyword = normalize(filters.search);
  const categoryId = filters.category && filters.category !== "all" ? filters.category : "";
  const minPrice = toNumber(filters.minPrice);
  const maxPrice = toNumber(filters.maxPrice);
  const minRating = toNumber(filters.minRating);
  const inStockOnly = toBoolean(filters.inStock);
  const promoOnly = toBoolean(filters.promo);

  let items = products.map(decorateProduct);

  if (keyword) {
    items = items.filter((product) => {
      const searchText = normalize(
        [
          product.name,
          product.brand,
          product.summary,
          product.category?.name,
          product.tags.join(" ")
        ].join(" ")
      );
      return searchText.includes(keyword);
    });
  }

  if (categoryId) {
    items = items.filter((product) => product.categoryId === categoryId);
  }

  if (minPrice !== null) {
    items = items.filter((product) => product.price >= minPrice);
  }

  if (maxPrice !== null) {
    items = items.filter((product) => product.price <= maxPrice);
  }

  if (minRating !== null) {
    items = items.filter((product) => product.rating >= minRating);
  }

  if (inStockOnly) {
    items = items.filter((product) => product.stock > 0);
  }

  if (promoOnly) {
    items = items.filter((product) => product.discountPercent > 0);
  }

  return {
    total: items.length,
    items: sortProducts(items, filters.sort)
  };
}

function getProductBySlug(slug) {
  const product = products.find((item) => item.slug === slug);
  return product ? decorateProduct(product) : null;
}

function getRelatedProducts(product, limit = 4) {
  if (!product) {
    return [];
  }

  return products
    .filter((item) => item.id !== product.id && item.categoryId === product.categoryId)
    .map(decorateProduct)
    .sort((first, second) => second.sold - first.sold)
    .slice(0, limit);
}

function getHomeCollections() {
  const decorated = products.map(decorateProduct);

  return {
    newest: sortProducts(decorated, "newest").slice(0, 4),
    bestSelling: sortProducts(decorated, "best-selling").slice(0, 4),
    promotions
  };
}

module.exports = {
  categories,
  promotions,
  listProducts,
  getProductBySlug,
  getRelatedProducts,
  getHomeCollections,
  normalize
};
