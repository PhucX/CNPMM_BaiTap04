const { categories, products, promotions } = require("../data/catalog");
const { toNumber, toBoolean, toPositiveInteger, normalize } = require("../utils/helpers");

function getViewCount(product) {
  return product.viewCount ?? product.sold * 4 + product.reviewCount;
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
    viewCount: getViewCount(product),
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
    case "most-viewed":
      sorted.sort((first, second) => second.viewCount - first.viewCount);
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

  const sortedItems = sortProducts(items, filters.sort);
  const hasPaginationInput = filters.page !== undefined || filters.pageSize !== undefined;
  const page = toPositiveInteger(filters.page, 1);
  const fallbackPageSize = hasPaginationInput ? 12 : sortedItems.length || 1;
  const pageSize = Math.min(toPositiveInteger(filters.pageSize, fallbackPageSize), 24);

  const total = sortedItems.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pagedItems = sortedItems.slice(start, start + pageSize);

  return {
    total,
    page: safePage,
    pageSize,
    totalPages,
    hasMore: safePage < totalPages,
    items: pagedItems
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

function getTopCollections(limit = 10) {
  const safeLimit = Math.min(toPositiveInteger(limit, 10), 10);
  const decorated = products.map(decorateProduct);

  return {
    bestSelling: sortProducts(decorated, "best-selling").slice(0, safeLimit),
    mostViewed: sortProducts(decorated, "most-viewed").slice(0, safeLimit)
  };
}

module.exports = {
  categories,
  promotions,
  listProducts,
  getProductBySlug,
  getRelatedProducts,
  getHomeCollections,
  getTopCollections,
  normalize
};
