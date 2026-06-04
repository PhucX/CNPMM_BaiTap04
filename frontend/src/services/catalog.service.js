import { api } from "./api";

function buildQueryParams(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== false && value !== "all" && value !== undefined && value !== null) {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
}

export function getHomeData() {
  return api("/api/home");
}

export function getCategories() {
  return api("/api/categories");
}

export function getPromotions() {
  return api("/api/promotions");
}

export function getTopProducts(limit = 10) {
  return api(`/api/products/top?${buildQueryParams({ limit })}`);
}

export function getProducts(filters = {}, pagination = {}) {
  const query = buildQueryParams({
    ...filters,
    page: pagination.page,
    pageSize: pagination.pageSize,
  });

  return api(`/api/products?${query}`);
}

export function getProductDetail(slug) {
  return api(`/api/products/${encodeURIComponent(slug)}`);
}
