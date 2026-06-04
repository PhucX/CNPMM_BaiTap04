import { api } from "./api";

export function getCart() {
  return api("/api/cart");
}

export function addCartItem(productId, color, size, quantity) {
  return api("/api/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, color, size, quantity }),
  });
}

export function updateCartItem(itemId, quantity) {
  return api(`/api/cart/items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(itemId) {
  return api(`/api/cart/items/${itemId}`, {
    method: "DELETE",
  });
}
