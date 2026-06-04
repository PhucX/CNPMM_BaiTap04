import axios from "axios";

const TOKEN_KEY = "urbanstep_token";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function api(path, options = {}) {
  const { body, ...config } = options;

  try {
    const response = await apiClient.request({
      url: path,
      method: config.method || "GET",
      data: body,
      ...config,
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.hash !== "#/login") {
        window.location.hash = "#/login";
      }
    }

    throw new Error(error.response?.data?.message || "Khong the ket noi API.");
  }
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
