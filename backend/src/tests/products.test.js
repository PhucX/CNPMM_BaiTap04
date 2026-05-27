const test = require("node:test");
const assert = require("node:assert/strict");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Promotion = require("../models/Promotion");
const {
  listProducts,
  getProductBySlug,
  getRelatedProducts,
  getTopCollections,
  getHomeCollections
} = require("../services/productService");

const categories = [
  { id: "running", name: "Running" },
  { id: "training", name: "Training" }
];

const products = [
  {
    id: "p-001",
    slug: "aerorun-pulse-1",
    name: "AeroRun Pulse 1",
    summary: "Light running shoe",
    categoryId: "running",
    price: 1500000,
    stock: 8,
    sold: 90,
    viewCount: 300,
    rating: 4.8,
    discountPercent: 10,
    createdAt: new Date("2026-01-03")
  },
  {
    id: "p-002",
    slug: "aerorun-dash",
    name: "AeroRun Dash",
    summary: "Daily run shoe",
    categoryId: "running",
    price: 1700000,
    stock: 4,
    sold: 80,
    viewCount: 250,
    rating: 4.7,
    discountPercent: 5,
    createdAt: new Date("2026-01-02")
  },
  {
    id: "p-003",
    slug: "court-trainer",
    name: "Court Trainer",
    summary: "Gym shoe",
    categoryId: "training",
    price: 900000,
    stock: 12,
    sold: 20,
    viewCount: 120,
    rating: 4.3,
    discountPercent: 0,
    createdAt: new Date("2026-01-01")
  },
  {
    id: "p-004",
    slug: "run-lite",
    name: "Run Lite",
    summary: "Budget run shoe",
    categoryId: "running",
    price: 800000,
    stock: 0,
    sold: 15,
    viewCount: 100,
    rating: 4.2,
    discountPercent: 15,
    createdAt: new Date("2026-01-04")
  }
];

const promotions = [
  { id: "promo-1", title: "Summer sale" }
];

function matchesFilter(product, filter = {}) {
  if (filter.$or) {
    const matched = filter.$or.some(condition => {
      const [field, rule] = Object.entries(condition)[0];
      return new RegExp(rule.$regex, rule.$options).test(product[field] || "");
    });
    if (!matched) return false;
  }

  if (filter.categoryId && product.categoryId !== filter.categoryId) return false;
  if (filter.price?.$gte !== undefined && product.price < filter.price.$gte) return false;
  if (filter.price?.$lte !== undefined && product.price > filter.price.$lte) return false;
  if (filter.rating?.$gte !== undefined && product.rating < filter.rating.$gte) return false;
  if (filter.stock?.$gt !== undefined && product.stock <= filter.stock.$gt) return false;
  if (filter.discountPercent?.$gt !== undefined && product.discountPercent <= filter.discountPercent.$gt) return false;
  if (filter.id?.$ne !== undefined && product.id === filter.id.$ne) return false;

  return true;
}

function sortProducts(items, criteria = {}) {
  const [[field, direction] = ["createdAt", -1]] = Object.entries(criteria);
  return [...items].sort((left, right) => {
    if (left[field] === right[field]) return 0;
    return left[field] > right[field] ? direction : -direction;
  });
}

function createFindChain(filter) {
  let result = products.filter(product => matchesFilter(product, filter));
  return {
    sort(criteria) {
      result = sortProducts(result, criteria);
      return this;
    },
    skip(count) {
      result = result.slice(count);
      return this;
    },
    limit(count) {
      return Promise.resolve(result.slice(0, count));
    }
  };
}

function mockCatalog(t) {
  t.mock.method(Product, "countDocuments", async (filter) => (
    products.filter(product => matchesFilter(product, filter)).length
  ));
  t.mock.method(Product, "find", (filter) => createFindChain(filter));
  t.mock.method(Product, "findOne", async (filter) => (
    products.find(product => Object.entries(filter).every(([key, value]) => product[key] === value)) || null
  ));
  t.mock.method(Category, "find", async (filter = {}) => {
    const ids = filter.id?.$in;
    return ids ? categories.filter(category => ids.includes(category.id)) : categories;
  });
  t.mock.method(Promotion, "find", async () => promotions);
}

test("listProducts filters by keyword, category, price, stock, promo and rating", async (t) => {
  mockCatalog(t);

  const result = await listProducts({
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
  assert.equal(result.items[0].category.id, "running");
});

test("listProducts can sort by price ascending", async (t) => {
  mockCatalog(t);

  const result = await listProducts({
    inStock: "true",
    sort: "price-asc"
  });

  assert.ok(result.items.length > 1);
  assert.ok(result.items[0].price <= result.items[1].price);
});

test("listProducts paginates products for lazy loading", async (t) => {
  mockCatalog(t);

  const firstPage = await listProducts({
    page: "1",
    pageSize: "2",
    sort: "newest"
  });
  const secondPage = await listProducts({
    page: "2",
    pageSize: "2",
    sort: "newest"
  });

  assert.equal(firstPage.page, 1);
  assert.equal(firstPage.pageSize, 2);
  assert.equal(firstPage.items.length, 2);
  assert.equal(firstPage.hasMore, true);
  assert.ok(secondPage.items.length > 0);
  assert.notEqual(firstPage.items[0].id, secondPage.items[0].id);
});

test("getTopCollections returns top selling and most viewed products", async (t) => {
  mockCatalog(t);

  const result = await getTopCollections(10);

  assert.ok(result.bestSelling.length > 0);
  assert.ok(result.bestSelling.length <= 10);
  assert.ok(result.mostViewed.length > 0);
  assert.ok(result.mostViewed.length <= 10);
  assert.ok(result.bestSelling[0].sold >= result.bestSelling.at(-1).sold);
  assert.ok(result.mostViewed[0].viewCount >= result.mostViewed.at(-1).viewCount);
});

test("product detail includes category and related products from same category", async (t) => {
  mockCatalog(t);

  const product = await getProductBySlug("aerorun-pulse-1");
  const related = await getRelatedProducts(product);

  assert.equal(product.category.id, "running");
  assert.ok(related.every((item) => item.categoryId === "running"));
  assert.ok(related.every((item) => item.id !== product.id));
});

test("getHomeCollections returns promotions", async (t) => {
  mockCatalog(t);

  const result = await getHomeCollections();

  assert.deepEqual(result.promotions, promotions);
});
