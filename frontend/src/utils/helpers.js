export const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

export function formatMoney(value) {
  return currencyFormatter.format(value).replace(/\s?₫/u, "đ");
}

export function initials(name) {
  return String(name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(-2)
    .toUpperCase();
}

export function getDefaultFilters() {
  return {
    search: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    inStock: false,
    promo: false,
    sort: "newest"
  };
}

export function getDefaultProductPagination() {
  return {
    page: 1,
    pageSize: 8,
    total: 0,
    totalPages: 1,
    hasMore: false,
    isLoading: false
  };
}
