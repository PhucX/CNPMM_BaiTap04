const test = require("node:test");
const assert = require("node:assert/strict");
const {
  listProducts,
  getProductBySlug,
  getRelatedProducts
} = require("../src/services/productService");

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

  assert.equal(result.total, 1);
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

test("product detail includes category and related products from same category", () => {
  const product = getProductBySlug("aerorun-pulse-1");
  const related = getRelatedProducts(product);

  assert.equal(product.category.id, "running");
  assert.ok(related.every((item) => item.categoryId === "running"));
  assert.ok(related.every((item) => item.id !== product.id));
});
