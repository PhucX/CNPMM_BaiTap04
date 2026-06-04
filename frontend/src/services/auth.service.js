import { api } from "./api";

export function login(email, password) {
  return api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser() {
  return api("/api/auth/me");
}
