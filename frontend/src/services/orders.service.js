import { api } from "./api";

export function getOrders() {
  return api("/api/orders");
}

export function createOrder(shippingInfo, paymentMethod = "COD") {
  return api("/api/orders", {
    method: "POST",
    body: JSON.stringify({ shippingInfo, paymentMethod }),
  });
}

export function cancelOrder(orderId) {
  return api(`/api/orders/${orderId}/cancel`, {
    method: "POST",
  });
}
