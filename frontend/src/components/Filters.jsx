import { useState, useEffect } from 'react';

export default function Filters({ categories, initialFilters, onApply, onReset }) {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded border border-zinc-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Bộ lọc sản phẩm</p>
          <h2 className="mt-1 text-xl font-black text-ink">Tìm nhanh đôi giày phù hợp</h2>
        </div>
        <button 
          type="button" 
          onClick={onReset}
          className="text-sm font-bold text-brand hover:text-teal-700"
        >
          Đặt lại
        </button>
      </div>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Từ khóa</span>
          <input 
            name="search" 
            value={filters.search} 
            onChange={handleChange}
            placeholder="Ví dụ: chạy bộ, gym..." 
            className="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand" 
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Danh mục</span>
          <select 
            name="category" 
            value={filters.category}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Giá từ</span>
          <input 
            name="minPrice" 
            type="number" 
            min="0" 
            step="100000" 
            value={filters.minPrice}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand" 
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Giá đến</span>
          <input 
            name="maxPrice" 
            type="number" 
            min="0" 
            step="100000" 
            value={filters.maxPrice}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand" 
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Đánh giá từ</span>
          <select 
            name="minRating" 
            value={filters.minRating}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          >
            <option value="">Tất cả</option>
            <option value="4">4.0 sao</option>
            <option value="4.5">4.5 sao</option>
            <option value="4.8">4.8 sao</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Sắp xếp</span>
          <select 
            name="sort" 
            value={filters.sort}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand"
          >
            <option value="newest">Mới nhất</option>
            <option value="best-selling">Bán chạy</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="rating">Đánh giá cao</option>
          </select>
        </label>
      </div>
      <div className="mt-5 space-y-4 border-t border-zinc-100 pt-4">
        <div className="space-y-3">
          <label className="flex items-center gap-3 rounded border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm font-semibold text-zinc-700">
            <input 
              name="inStock" 
              type="checkbox" 
              className="h-4 w-4 accent-brand" 
              checked={filters.inStock}
              onChange={handleChange}
            />
            Chỉ hiện sản phẩm còn hàng
          </label>
          <label className="flex items-center gap-3 rounded border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm font-semibold text-zinc-700">
            <input 
              name="promo" 
              type="checkbox" 
              className="h-4 w-4 accent-brand" 
              checked={filters.promo}
              onChange={handleChange}
            />
            Đang khuyến mãi
          </label>
        </div>
        <button type="submit" className="focus-ring ui-button ui-button-dark w-full px-5 py-3">
          Áp dụng bộ lọc
        </button>
      </div>
    </form>
  );
}
