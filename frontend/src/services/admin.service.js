import { api } from "./api";

function buildQueryParams(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
}

export function getDashboardStats() {
  return api("/api/admin/stats");
}

export function getAdminProducts(page = 1, pageSize = 10) {
  const query = buildQueryParams({ page, pageSize });
  return api(`/api/admin/products?${query}`);
}

export function createAdminProduct(product) {
  return api("/api/admin/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function updateAdminProduct(productId, product) {
  return api(`/api/admin/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export function deleteAdminProduct(productId) {
  return api(`/api/admin/products/${productId}`, {
    method: "DELETE",
  });
}

export function getAdminOrders() {
  return api("/api/admin/orders");
}

export function updateAdminOrderStatus(orderId, status, note) {
  return api(`/api/admin/orders/${orderId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status, note }),
  });
}

export function getAdminUsers() {
  return api("/api/admin/users");
}
