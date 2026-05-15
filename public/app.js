const tokenKey = "urbanstep_token";
const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

const app = document.querySelector("#app");

const state = {
  user: null,
  categories: [],
  promotions: [],
  products: [],
  newest: [],
  bestSelling: [],
  filters: {
    search: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    inStock: false,
    promo: false,
    sort: "newest"
  },
  currentProduct: null,
  quantity: 1
};

function formatMoney(value) {
  return currencyFormatter.format(value).replace(/\s₫/, "d");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function api(path, options = {}) {
  const token = localStorage.getItem(tokenKey);
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem(tokenKey);
      state.user = null;
    }

    throw new Error(payload.message || "Khong the ket noi API.");
  }

  return payload;
}

function initials(name) {
  return String(name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(-2)
    .toUpperCase();
}

function navTemplate() {
  if (!state.user) {
    return "";
  }

  return `
    <header class="sticky top-0 z-30 border-b border-zinc-200 bg-paper/95 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#/home" class="flex min-w-0 items-center gap-3">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded bg-ink text-sm font-black text-white">US</span>
          <span class="min-w-0">
            <span class="block truncate text-base font-black text-ink">UrbanStep</span>
            <span class="block truncate text-xs font-medium text-zinc-500">Sneaker Store</span>
          </span>
        </a>
        <div class="flex items-center gap-3">
          <div class="hidden items-center gap-3 rounded border border-zinc-200 bg-white px-3 py-2 shadow-sm sm:flex">
            <span class="grid h-9 w-9 place-items-center rounded bg-teal-50 text-xs font-black text-brand">${escapeHtml(initials(state.user.name))}</span>
            <span class="min-w-0 text-sm">
              <span class="block max-w-44 truncate font-semibold text-ink">${escapeHtml(state.user.name)}</span>
              <span class="block text-xs text-zinc-500">${escapeHtml(state.user.loyaltyRank)} member - ${state.user.points} diem</span>
            </span>
          </div>
          <button data-action="logout" class="focus-ring rounded bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  `;
}

function loadingTemplate(message = "Dang tai du lieu...") {
  return `
    ${navTemplate()}
    <main class="grid min-h-[70vh] place-items-center px-6">
      <div class="text-center">
        <div class="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-zinc-200 border-t-brand"></div>
        <p class="mt-4 text-sm font-medium text-zinc-500">${escapeHtml(message)}</p>
      </div>
    </main>
  `;
}

function renderLogin(error = "") {
  app.innerHTML = `
    <main class="grid min-h-screen bg-paper lg:grid-cols-[1.05fr_0.95fr]">
      <section class="hero-photo relative hidden min-h-screen px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <a href="#/login" class="flex items-center gap-3">
          <span class="grid h-12 w-12 place-items-center rounded bg-white text-base font-black text-ink">US</span>
          <span>
            <span class="block text-lg font-black">UrbanStep</span>
            <span class="block text-sm text-white/72">Sneaker Store</span>
          </span>
        </a>
        <div class="max-w-2xl pb-8">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-orange-200">Spring drop 2026</p>
          <h1 class="mt-4 text-5xl font-black leading-tight xl:text-6xl">UrbanStep Sneaker Store</h1>
          <p class="mt-5 max-w-xl text-lg leading-8 text-white/82">
            Bo suu tap giay the thao cho chay bo, gym, lifestyle va bong ro voi uu dai rieng cho thanh vien.
          </p>
        </div>
      </section>

      <section class="flex min-h-screen items-center justify-center px-5 py-10">
        <div class="w-full max-w-md">
          <div class="mb-10 lg:hidden">
            <span class="grid h-12 w-12 place-items-center rounded bg-ink text-base font-black text-white">US</span>
            <h1 class="mt-5 text-3xl font-black text-ink">UrbanStep Sneaker Store</h1>
            <p class="mt-2 text-sm text-zinc-500">Dang nhap thanh vien de vao trang chu ban hang.</p>
          </div>
          <div class="rounded border border-zinc-200 bg-white p-6 shadow-soft sm:p-8">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Member login</p>
              <h2 class="mt-3 text-2xl font-black text-ink">Dang nhap thanh vien</h2>
              <p class="mt-2 text-sm text-zinc-500">Tai khoan demo: member@urbanstep.vn / 123456</p>
            </div>
            ${error ? `<p class="mt-5 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">${escapeHtml(error)}</p>` : ""}
            <form id="login-form" class="mt-6 space-y-4">
              <label class="block">
                <span class="text-sm font-semibold text-zinc-700">Email</span>
                <input name="email" type="email" autocomplete="email" value="member@urbanstep.vn" class="focus-ring mt-2 w-full rounded border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-brand" required />
              </label>
              <label class="block">
                <span class="text-sm font-semibold text-zinc-700">Mat khau</span>
                <input name="password" type="password" autocomplete="current-password" value="123456" class="focus-ring mt-2 w-full rounded border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-brand" required />
              </label>
              <button class="focus-ring w-full rounded bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700">
                Dang nhap
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  `;

  document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const result = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password")
        })
      });

      if (result.user.role !== "member") {
        renderLogin("Tai khoan nay khong phai vai tro thanh vien.");
        return;
      }

      localStorage.setItem(tokenKey, result.token);
      state.user = result.user;
      window.location.hash = "#/home";
    } catch (error) {
      renderLogin(error.message);
    }
  });
}

function promotionToneClasses(tone) {
  const tones = {
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
    sky: "border-sky-200 bg-sky-50 text-sky-900"
  };

  return tones[tone] || tones.sky;
}

function promotionTemplate(promotion) {
  return `
    <article class="rounded border p-4 ${promotionToneClasses(promotion.tone)}">
      <span class="inline-flex rounded bg-white/70 px-2.5 py-1 text-xs font-black uppercase tracking-wide">${escapeHtml(promotion.badge)}</span>
      <h3 class="mt-4 text-lg font-black">${escapeHtml(promotion.title)}</h3>
      <p class="mt-2 text-sm leading-6 opacity-80">${escapeHtml(promotion.description)}</p>
    </article>
  `;
}

function productCardTemplate(product) {
  return `
    <article class="product-card overflow-hidden rounded border border-zinc-200 bg-white shadow-sm">
      <button data-product-link="${escapeHtml(product.slug)}" class="block w-full text-left">
        <div class="relative aspect-[4/3] overflow-hidden bg-zinc-100">
          <img src="${escapeHtml(product.images[0])}" alt="${escapeHtml(product.name)}" class="h-full w-full object-cover" loading="lazy" />
          <div class="absolute left-3 top-3 flex flex-wrap gap-2">
            ${product.discountPercent ? `<span class="rounded bg-accent px-2.5 py-1 text-xs font-black text-white">-${product.discountPercent}%</span>` : ""}
            ${product.isNew ? `<span class="rounded bg-ink px-2.5 py-1 text-xs font-black text-white">Moi</span>` : ""}
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate text-xs font-bold uppercase tracking-wide text-brand">${escapeHtml(product.category.name)}</p>
              <h3 class="mt-1 truncate text-base font-black text-ink">${escapeHtml(product.name)}</h3>
            </div>
            <span class="shrink-0 rounded bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-700">${product.rating.toFixed(1)} sao</span>
          </div>
          <p class="mt-3 min-h-10 text-sm leading-5 text-zinc-500">${escapeHtml(product.summary)}</p>
          <div class="mt-4 flex items-end justify-between gap-3">
            <div>
              <p class="text-lg font-black text-ink">${formatMoney(product.price)}</p>
              ${product.originalPrice > product.price ? `<p class="text-sm text-zinc-400 line-through">${formatMoney(product.originalPrice)}</p>` : ""}
            </div>
            <span class="text-right text-xs font-semibold ${product.stock > 0 ? "text-emerald-700" : "text-red-600"}">
              ${product.stock > 0 ? `Con ${product.stock}` : "Het hang"}
            </span>
          </div>
        </div>
      </button>
    </article>
  `;
}

function compactProductCardTemplate(product) {
  return `
    <article class="related-card overflow-hidden rounded border border-zinc-200 bg-white">
      <button data-product-link="${escapeHtml(product.slug)}" class="block w-full text-left">
        <div class="aspect-[4/3] overflow-hidden bg-zinc-100">
          <img src="${escapeHtml(product.images[0])}" alt="${escapeHtml(product.name)}" class="h-full w-full object-cover" loading="lazy" />
        </div>
        <div class="p-4">
          <p class="text-xs font-bold uppercase tracking-wide text-brand">${escapeHtml(product.category.name)}</p>
          <h3 class="mt-1 truncate text-sm font-black text-ink">${escapeHtml(product.name)}</h3>
          <div class="mt-3 flex items-center justify-between gap-2">
            <span class="font-black text-ink">${formatMoney(product.price)}</span>
            <span class="text-xs font-semibold text-zinc-500">Da ban ${product.sold}</span>
          </div>
        </div>
      </button>
    </article>
  `;
}

function filtersTemplate() {
  return `
    <form id="filter-form" class="rounded border border-zinc-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-base font-black text-ink">Tim kiem va loc</h2>
        <button type="button" id="reset-filter" class="text-sm font-semibold text-brand hover:text-teal-700">Dat lai</button>
      </div>
      <div class="mt-5 space-y-4">
        <label class="block">
          <span class="text-sm font-semibold text-zinc-700">Tu khoa</span>
          <input name="search" value="${escapeHtml(state.filters.search)}" placeholder="Vi du: running, gym..." class="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand" />
        </label>
        <label class="block">
          <span class="text-sm font-semibold text-zinc-700">Danh muc</span>
          <select name="category" class="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand">
            <option value="all">Tat ca danh muc</option>
            ${state.categories
              .map(
                (category) =>
                  `<option value="${escapeHtml(category.id)}" ${state.filters.category === category.id ? "selected" : ""}>${escapeHtml(category.name)}</option>`
              )
              .join("")}
          </select>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="text-sm font-semibold text-zinc-700">Gia tu</span>
            <input name="minPrice" type="number" min="0" step="100000" value="${escapeHtml(state.filters.minPrice)}" class="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand" />
          </label>
          <label class="block">
            <span class="text-sm font-semibold text-zinc-700">Gia den</span>
            <input name="maxPrice" type="number" min="0" step="100000" value="${escapeHtml(state.filters.maxPrice)}" class="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand" />
          </label>
        </div>
        <label class="block">
          <span class="text-sm font-semibold text-zinc-700">Danh gia tu</span>
          <select name="minRating" class="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand">
            <option value="">Tat ca</option>
            <option value="4" ${state.filters.minRating === "4" ? "selected" : ""}>4.0 sao</option>
            <option value="4.5" ${state.filters.minRating === "4.5" ? "selected" : ""}>4.5 sao</option>
            <option value="4.8" ${state.filters.minRating === "4.8" ? "selected" : ""}>4.8 sao</option>
          </select>
        </label>
        <label class="flex items-center gap-3 rounded border border-zinc-200 px-3 py-2.5 text-sm font-semibold text-zinc-700">
          <input name="inStock" type="checkbox" class="h-4 w-4 accent-brand" ${state.filters.inStock ? "checked" : ""} />
          Chi hien san pham con hang
        </label>
        <label class="flex items-center gap-3 rounded border border-zinc-200 px-3 py-2.5 text-sm font-semibold text-zinc-700">
          <input name="promo" type="checkbox" class="h-4 w-4 accent-brand" ${state.filters.promo ? "checked" : ""} />
          Dang khuyen mai
        </label>
        <label class="block">
          <span class="text-sm font-semibold text-zinc-700">Sap xep</span>
          <select name="sort" class="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand">
            <option value="newest" ${state.filters.sort === "newest" ? "selected" : ""}>Moi nhat</option>
            <option value="best-selling" ${state.filters.sort === "best-selling" ? "selected" : ""}>Ban chay</option>
            <option value="price-asc" ${state.filters.sort === "price-asc" ? "selected" : ""}>Gia tang dan</option>
            <option value="price-desc" ${state.filters.sort === "price-desc" ? "selected" : ""}>Gia giam dan</option>
            <option value="rating" ${state.filters.sort === "rating" ? "selected" : ""}>Danh gia cao</option>
          </select>
        </label>
        <button class="focus-ring w-full rounded bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-zinc-700">Ap dung bo loc</button>
      </div>
    </form>
  `;
}

function homeTemplate() {
  return `
    ${navTemplate()}
    <main>
      <section class="hero-photo">
        <div class="mx-auto grid min-h-[420px] max-w-7xl items-end px-4 py-12 sm:px-6 lg:px-8">
          <div class="max-w-3xl text-white">
            <p class="text-sm font-bold uppercase tracking-[0.22em] text-orange-200">Member exclusive</p>
            <h1 class="mt-4 text-4xl font-black leading-tight sm:text-5xl">Giay the thao moi cho lich tap va lich di chuyen cua ban</h1>
            <p class="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
              Xin chao ${escapeHtml(state.user.name)}. Chon nhanh mau moi, san pham ban chay va uu dai danh rieng cho thanh vien ${escapeHtml(state.user.loyaltyRank)}.
            </p>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="grid gap-4 md:grid-cols-3">
          ${state.promotions.map(promotionTemplate).join("")}
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside>
            ${filtersTemplate()}
          </aside>
          <div class="min-w-0 space-y-10">
            <section>
              <div class="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p class="text-sm font-bold uppercase tracking-[0.18em] text-brand">Moi nhat</p>
                  <h2 class="mt-1 text-2xl font-black text-ink">Vua len ke</h2>
                </div>
              </div>
              <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                ${state.newest.map(compactProductCardTemplate).join("")}
              </div>
            </section>

            <section>
              <div class="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p class="text-sm font-bold uppercase tracking-[0.18em] text-brand">Ban chay</p>
                  <h2 class="mt-1 text-2xl font-black text-ink">Duoc mua nhieu</h2>
                </div>
              </div>
              <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                ${state.bestSelling.map(compactProductCardTemplate).join("")}
              </div>
            </section>

            <section>
              <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p class="text-sm font-bold uppercase tracking-[0.18em] text-brand">Tat ca san pham</p>
                  <h2 class="mt-1 text-2xl font-black text-ink">Ket qua tim kiem</h2>
                </div>
                <p id="result-count" class="text-sm font-semibold text-zinc-500"></p>
              </div>
              <div id="product-grid" class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"></div>
            </section>
          </div>
        </div>
      </section>
    </main>
  `;
}

function readFilters(form) {
  const formData = new FormData(form);
  state.filters = {
    search: String(formData.get("search") || ""),
    category: String(formData.get("category") || "all"),
    minPrice: String(formData.get("minPrice") || ""),
    maxPrice: String(formData.get("maxPrice") || ""),
    minRating: String(formData.get("minRating") || ""),
    inStock: formData.get("inStock") === "on",
    promo: formData.get("promo") === "on",
    sort: String(formData.get("sort") || "newest")
  };
}

function buildProductQuery() {
  const params = new URLSearchParams();

  Object.entries(state.filters).forEach(([key, value]) => {
    if (value !== "" && value !== false && value !== "all") {
      params.set(key, value);
    }
  });

  return params.toString();
}

function renderProductGrid(total = state.products.length) {
  const grid = document.querySelector("#product-grid");
  const count = document.querySelector("#result-count");

  if (!grid || !count) {
    return;
  }

  count.textContent = `${total} san pham`;
  grid.innerHTML = state.products.length
    ? state.products.map(productCardTemplate).join("")
    : `<div class="rounded border border-dashed border-zinc-300 bg-white px-5 py-10 text-center text-sm font-medium text-zinc-500 sm:col-span-2 xl:col-span-3">Khong co san pham phu hop bo loc.</div>`;
}

async function loadProducts() {
  const query = buildProductQuery();
  const data = await api(`/api/products${query ? `?${query}` : ""}`);
  state.products = data.items;
  renderProductGrid(data.total);
}

function bindHomeEvents() {
  const form = document.querySelector("#filter-form");
  const reset = document.querySelector("#reset-filter");
  let inputTimer;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    readFilters(form);
    await loadProducts();
  });

  form.addEventListener("input", () => {
    clearTimeout(inputTimer);
    inputTimer = setTimeout(async () => {
      readFilters(form);
      await loadProducts();
    }, 320);
  });

  form.addEventListener("change", async () => {
    readFilters(form);
    await loadProducts();
  });

  reset.addEventListener("click", async () => {
    state.filters = {
      search: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      inStock: false,
      promo: false,
      sort: "newest"
    };
    app.innerHTML = homeTemplate();
    bindHomeEvents();
    await loadProducts();
  });
}

async function renderHome() {
  if (!ensureMember()) {
    return;
  }

  app.innerHTML = loadingTemplate("Dang tai trang chu...");
  const [home, categoriesData] = await Promise.all([api("/api/home"), api("/api/categories")]);
  state.promotions = home.promotions;
  state.newest = home.newest;
  state.bestSelling = home.bestSelling;
  state.categories = categoriesData.items;
  app.innerHTML = homeTemplate();
  bindHomeEvents();
  await loadProducts();
}

function productDetailTemplate(product, related) {
  const quantityDisabled = product.stock <= 0;

  return `
    ${navTemplate()}
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <a href="#/home" class="inline-flex items-center text-sm font-bold text-brand hover:text-teal-700">Quay lai trang chu</a>
      <section class="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="min-w-0">
          <div class="swiper product-swiper overflow-hidden rounded border border-zinc-200 bg-white">
            <div class="swiper-wrapper">
              ${product.images
                .map(
                  (image) => `
                    <div class="swiper-slide">
                      <div class="aspect-[4/3] bg-zinc-100">
                        <img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)}" class="h-full w-full object-cover" />
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
            ${product.images.length > 1 ? `<div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div>` : ""}
          </div>
        </div>

        <div class="min-w-0">
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-brand">${escapeHtml(product.category.name)}</p>
          <h1 class="mt-2 text-3xl font-black leading-tight text-ink sm:text-4xl">${escapeHtml(product.name)}</h1>
          <p class="mt-4 text-base leading-7 text-zinc-600">${escapeHtml(product.description)}</p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <span class="rounded bg-zinc-100 px-3 py-1.5 text-sm font-bold text-zinc-700">${product.rating.toFixed(1)} sao - ${product.reviewCount} danh gia</span>
            <span class="rounded bg-zinc-100 px-3 py-1.5 text-sm font-bold text-zinc-700">Da ban ${product.sold}</span>
            <span class="rounded px-3 py-1.5 text-sm font-bold ${product.stock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}">
              ${product.stock > 0 ? `Con ${product.stock} san pham` : "Het hang"}
            </span>
          </div>

          <div class="mt-6 border-y border-zinc-200 py-5">
            <div class="flex flex-wrap items-end gap-3">
              <span class="text-3xl font-black text-ink">${formatMoney(product.price)}</span>
              ${product.originalPrice > product.price ? `<span class="text-base font-semibold text-zinc-400 line-through">${formatMoney(product.originalPrice)}</span>` : ""}
              ${product.discountPercent ? `<span class="rounded bg-accent px-2.5 py-1 text-xs font-black text-white">Giam ${product.discountPercent}%</span>` : ""}
            </div>
          </div>

          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-sm font-bold text-zinc-700">Mau sac</p>
              <div class="mt-2 flex flex-wrap gap-2">
                ${product.colors.map((color) => `<span class="rounded border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700">${escapeHtml(color)}</span>`).join("")}
              </div>
            </div>
            <div>
              <p class="text-sm font-bold text-zinc-700">Size</p>
              <div class="mt-2 flex flex-wrap gap-2">
                ${product.sizes.map((size) => `<span class="grid h-9 min-w-9 place-items-center rounded border border-zinc-200 bg-white px-2 text-sm font-bold text-zinc-700">${size}</span>`).join("")}
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <div class="inline-flex h-12 overflow-hidden rounded border border-zinc-300 bg-white">
              <button data-action="decrease-qty" class="focus-ring grid w-12 place-items-center text-xl font-bold text-ink disabled:text-zinc-300" ${quantityDisabled ? "disabled" : ""}>-</button>
              <span id="quantity-value" class="grid w-14 place-items-center border-x border-zinc-200 text-sm font-black">${state.quantity}</span>
              <button data-action="increase-qty" class="focus-ring grid w-12 place-items-center text-xl font-bold text-ink disabled:text-zinc-300" ${quantityDisabled ? "disabled" : ""}>+</button>
            </div>
            <button data-action="add-to-cart" class="focus-ring h-12 rounded bg-brand px-6 text-sm font-bold text-white transition hover:bg-teal-700 disabled:bg-zinc-300" ${quantityDisabled ? "disabled" : ""}>
              Them vao gio
            </button>
          </div>
          <p id="cart-message" class="mt-3 min-h-6 text-sm font-semibold text-brand"></p>

          <div class="mt-6 rounded border border-zinc-200 bg-white p-4">
            <h2 class="text-base font-black text-ink">Thong so noi bat</h2>
            <ul class="mt-3 grid gap-2 text-sm leading-6 text-zinc-600 sm:grid-cols-2">
              ${product.specs.map((spec) => `<li class="flex gap-2"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span><span>${escapeHtml(spec)}</span></li>`).join("")}
            </ul>
          </div>
        </div>
      </section>

      <section class="mt-12">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.18em] text-brand">Cung danh muc</p>
            <h2 class="mt-1 text-2xl font-black text-ink">San pham tuong tu</h2>
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          ${
            related.length
              ? related.map(compactProductCardTemplate).join("")
              : `<div class="rounded border border-dashed border-zinc-300 bg-white px-5 py-8 text-center text-sm font-medium text-zinc-500 sm:col-span-2 lg:col-span-4">Chua co san pham tuong tu.</div>`
          }
        </div>
      </section>
    </main>
  `;
}

function bindDetailEvents() {
  const product = state.currentProduct;
  const quantityValue = document.querySelector("#quantity-value");
  const cartMessage = document.querySelector("#cart-message");

  if (product.images.length > 1 && window.Swiper) {
    new Swiper(".product-swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }

  document.querySelector("[data-action='decrease-qty']")?.addEventListener("click", () => {
    state.quantity = Math.max(1, state.quantity - 1);
    quantityValue.textContent = state.quantity;
    cartMessage.textContent = "";
  });

  document.querySelector("[data-action='increase-qty']")?.addEventListener("click", () => {
    state.quantity = Math.min(product.stock, state.quantity + 1);
    quantityValue.textContent = state.quantity;
    cartMessage.textContent = state.quantity === product.stock ? "So luong da dat toi da ton kho." : "";
  });

  document.querySelector("[data-action='add-to-cart']")?.addEventListener("click", () => {
    cartMessage.textContent = `Da them ${state.quantity} san pham ${product.name} vao gio hang demo.`;
  });
}

async function renderProductDetail(slug) {
  if (!ensureMember()) {
    return;
  }

  app.innerHTML = loadingTemplate("Dang tai chi tiet san pham...");

  try {
    const data = await api(`/api/products/${encodeURIComponent(slug)}`);
    state.currentProduct = data.product;
    state.quantity = data.product.stock > 0 ? 1 : 0;
    app.innerHTML = productDetailTemplate(data.product, data.related);
    bindDetailEvents();
  } catch (error) {
    app.innerHTML = `
      ${navTemplate()}
      <main class="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 class="text-3xl font-black text-ink">Khong tim thay san pham</h1>
        <p class="mt-3 text-zinc-500">${escapeHtml(error.message)}</p>
        <a href="#/home" class="mt-6 inline-flex rounded bg-brand px-5 py-3 text-sm font-bold text-white">Ve trang chu</a>
      </main>
    `;
  }
}

function ensureMember() {
  if (!state.user) {
    window.location.hash = "#/login";
    return false;
  }

  if (state.user.role !== "member") {
    localStorage.removeItem(tokenKey);
    state.user = null;
    renderLogin("Chi tai khoan vai tro thanh vien moi duoc truy cap trang chu.");
    return false;
  }

  return true;
}

async function route() {
  const hash = window.location.hash || "#/home";

  if (hash === "#/login") {
    renderLogin();
    return;
  }

  if (!state.user) {
    try {
      const data = await api("/api/auth/me");
      state.user = data.user;
    } catch (error) {
      renderLogin();
      return;
    }
  }

  if (hash.startsWith("#/product/")) {
    const slug = decodeURIComponent(hash.replace("#/product/", ""));
    await renderProductDetail(slug);
    return;
  }

  await renderHome();
}

document.addEventListener("click", (event) => {
  const logoutButton = event.target.closest("[data-action='logout']");
  if (logoutButton) {
    localStorage.removeItem(tokenKey);
    state.user = null;
    window.location.hash = "#/login";
    return;
  }

  const productLink = event.target.closest("[data-product-link]");
  if (productLink) {
    window.location.hash = `#/product/${encodeURIComponent(productLink.dataset.productLink)}`;
  }
});

window.addEventListener("hashchange", route);
route();
