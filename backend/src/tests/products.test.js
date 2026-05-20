const test = require("node:test");
const assert = require("node:assert/strict");
const {
  listProducts,
  getProductBySlug,
  getRelatedProducts,
  getTopCollections
} = require("../services/productService");

test("listProducts filters by keyword, category, price, stock, promo and rating", () => {
  const result = listProducts({
    search: "run",
    category: "running",
    minPrice: "1000000",
    maxPrice: "1800000",
    minRating: "4.5",
    inStock: "true",
    promo: "true",
    sort: "best-selling"
  });

  assert.equal(result.total, 2);
  assert.equal(result.items[0].slug, "aerorun-pulse-1");
});

test("listProducts can sort by price ascending", () => {
  const result = listProducts({
    inStock: "true",
    sort: "price-asc"
  });

  assert.ok(result.items.length > 1);
  assert.ok(result.items[0].price <= result.items[1].price);
});

test("listProducts paginates products for lazy loading", () => {
  const firstPage = listProducts({
    page: "1",
    pageSize: "3",
    sort: "newest"
  });
  const secondPage = listProducts({
    page: "2",
    pageSize: "3",
    sort: "newest"
  });

  assert.equal(firstPage.page, 1);
  assert.equal(firstPage.pageSize, 3);
  assert.equal(firstPage.items.length, 3);
  assert.equal(firstPage.hasMore, true);
  assert.ok(secondPage.items.length > 0);
  assert.notEqual(firstPage.items[0].id, secondPage.items[0].id);
});

test("getTopCollections returns top selling and most viewed products", () => {
  const result = getTopCollections(10);

  assert.ok(result.bestSelling.length > 0);
  assert.ok(result.bestSelling.length <= 10);
  assert.ok(result.mostViewed.length > 0);
  assert.ok(result.mostViewed.length <= 10);
  assert.ok(result.bestSelling[0].sold >= result.bestSelling.at(-1).sold);
  assert.ok(result.mostViewed[0].viewCount >= result.mostViewed.at(-1).viewCount);
});

test("product detail includes category and related products from same category", () => {
  const product = getProductBySlug("aerorun-pulse-1");
  const related = getRelatedProducts(product);

  assert.equal(product.category.id, "running");
  assert.ok(related.every((item) => item.categoryId === "running"));
  assert.ok(related.every((item) => item.id !== product.id));
});
