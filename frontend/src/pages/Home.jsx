import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../layout/Header';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/Carousel';
import SkeletonCard from '../components/SkeletonCard';
import { api } from '../services/api';
import { getDefaultFilters, getDefaultProductPagination, formatMoney } from '../utils/helpers';
import { Sparkles, TrendingUp, Zap, SlidersHorizontal } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const [, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [topCollections, setTopCollections] = useState({ bestSelling: [], mostViewed: [] });
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(getDefaultFilters());
  const [pagination, setPagination] = useState(getDefaultProductPagination());
  const [error, setError] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sentinelRef = useRef(null);

  const fetchHomeData = async () => {
    try {
      const [home, categoriesData, topData] = await Promise.all([
        api("/api/home"),
        api("/api/categories"),
        api("/api/products/top?limit=10")
      ]);
      setPromotions(home.promotions);
      setCategories(categoriesData.items);
      setTopCollections(topData);
    } catch (err) {
      console.error('Failed to fetch home data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = useCallback(async (currentFilters, currentPage = 1, append = false) => {
    setPagination(prev => ({ ...prev, isLoading: true }));
    setError('');

    const params = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value !== "" && value !== false && value !== "all") {
        params.set(key, value);
      }
    });
    params.set("page", currentPage);
    params.set("pageSize", pagination.pageSize);

    try {
      const data = await api(`/api/products?${params.toString()}`);
      setProducts(prev => append ? [...prev, ...data.items] : data.items);
      setPagination({
        ...pagination,
        page: data.page,
        pageSize: data.pageSize,
        total: data.total,
        totalPages: data.totalPages,
        hasMore: data.hasMore,
        isLoading: false
      });
    } catch (err) {
      setError(err.message);
      setPagination(prev => ({ ...prev, isLoading: false }));
    }
  }, [pagination.pageSize]);

  useEffect(() => {
    if (user) {
      fetchHomeData();
      loadProducts(filters, 1, false);
    }
  }, [user]);

  useEffect(() => {
    if (!sentinelRef.current || !pagination.hasMore || pagination.isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadProducts(filters, pagination.page + 1, true);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [pagination.hasMore, pagination.isLoading, pagination.page, filters, loadProducts]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination(getDefaultProductPagination());
    loadProducts(newFilters, 1, false);
    setIsFilterOpen(false);
    document.querySelector("#results-section")?.scrollIntoView({ behavior: "smooth", block: "start", offsetTop: -100 });
  };

  const handleResetFilters = () => {
    const defaultFilters = getDefaultFilters();
    setFilters(defaultFilters);
    setPagination(getDefaultProductPagination());
    loadProducts(defaultFilters, 1, false);
  };

  if (!user) return null;

  const getActiveFilterPills = () => {
    const pills = [];
    const category = categories.find((item) => item.id === filters.category);
    const sortLabels = {
      newest: "Mới nhất",
      "best-selling": "Bán chạy",
      "price-asc": "Giá tăng dần",
      "price-desc": "Giá giảm dần",
      rating: "Đánh giá cao"
    };

    if (filters.search) pills.push(`Từ khóa: ${filters.search}`);
    if (category) pills.push(`Danh mục: ${category.name}`);
    if (filters.minPrice || filters.maxPrice) {
      const from = filters.minPrice ? formatMoney(Number(filters.minPrice)) : "0đ";
      const to = filters.maxPrice ? formatMoney(Number(filters.maxPrice)) : "∞";
      pills.push(`Giá: ${from} - ${to}`);
    }
    if (filters.minRating) pills.push(`Từ ${filters.minRating} sao`);
    if (filters.inStock) pills.push("Còn hàng");
    if (filters.promo) pills.push("Giảm giá");
    if (filters.sort && filters.sort !== "newest") pills.push(`${sortLabels[filters.sort] || sortLabels.newest}`);

    return pills.length ? pills : ["Tất cả sản phẩm"];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-paper"
    >
      <Header />
      <main>
        <section className="hero-photo relative overflow-hidden">
          <div className="mx-auto grid min-h-[440px] max-w-7xl items-center px-4 pb-16 pt-24 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-3xl text-white relative z-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-orange-200 backdrop-blur-md ring-1 ring-orange-500/30">
                <Sparkles size={14} />
                Ưu đãi thành viên {user.loyaltyRank}
              </div>
              <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight sm:text-7xl">
                Nâng tầm <span className="text-brand">bước chân</span> của bạn
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
                Chào mừng trở lại, <span className="font-bold text-white">{user.name}</span>. Khám phá bộ sưu tập giày thể thao mới nhất với ưu đãi độc quyền dành riêng cho bạn.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                 <button onClick={() => document.querySelector("#results-section")?.scrollIntoView({ behavior: "smooth" })} className="ui-button ui-button-brand h-14 px-8 text-base shadow-xl shadow-brand/20">
                   Mua sắm ngay
                 </button>
                 <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-2 pl-4 backdrop-blur-md ring-1 ring-white/20">
                   <div className="text-sm font-bold">
                     <span className="block text-white/60 text-[10px] uppercase">Điểm tích lũy</span>
                     <span className="text-brand">{user.points} points</span>
                   </div>
                   <div className="h-10 w-10 rounded-xl bg-brand grid place-items-center">
                     <Zap size={20} className="fill-white text-white" />
                   </div>
                 </div>
              </div>
            </motion.div>
            
            {/* Trang trí nền */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-brand/20 to-transparent pointer-events-none"></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <Filters 
                  categories={categories} 
                  initialFilters={filters} 
                  onApply={handleApplyFilters} 
                  onReset={handleResetFilters} 
                />
              </div>
            </aside>

            <div className="min-w-0 space-y-16">
              <section id="results-section" className="scroll-mt-28">
                <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 text-brand">
                      <TrendingUp size={20} />
                      <span className="text-xs font-black uppercase tracking-widest">Khám phá</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">Sản phẩm dành cho bạn</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-zinc-400">
                      Tìm thấy <span className="text-ink">{products.length}</span> / <span className="text-ink">{pagination.total}</span> sản phẩm
                    </p>
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="lg:hidden focus-ring flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-bold text-ink shadow-sm"
                    >
                      <SlidersHorizontal size={18} />
                      Bộ lọc
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="lg:hidden mb-8 overflow-hidden"
                    >
                      <Filters 
                        categories={categories} 
                        initialFilters={filters} 
                        onApply={handleApplyFilters} 
                        onReset={handleResetFilters} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mb-8 flex flex-wrap gap-2">
                  {getActiveFilterPills().map((pill, i) => (
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={i} 
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-wider text-zinc-500 shadow-sm"
                    >
                      {pill}
                    </motion.span>
                  ))}
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600 flex items-center gap-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                    {error}
                  </motion.p>
                )}

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {products.length > 0 ? (
                    products.map(product => <ProductCard key={product.id} product={product} />)
                  ) : pagination.isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                  ) : (
                    <div className="col-span-full rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 px-5 py-20 text-center">
                      <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                        <Zap size={32} />
                      </div>
                      <h3 className="text-lg font-black text-ink">Không tìm thấy sản phẩm</h3>
                      <p className="mt-1 text-sm font-medium text-zinc-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                      <button onClick={handleResetFilters} className="mt-6 text-sm font-black text-brand underline underline-offset-4">Xóa tất cả bộ lọc</button>
                    </div>
                  )}
                </motion.div>

                <div ref={sentinelRef} className="mt-12 py-10 text-center">
                  {pagination.isLoading && products.length > 0 ? (
                    <div className="inline-flex items-center gap-3 text-brand font-black text-xs uppercase tracking-widest">
                      <div className="flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-bounce"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-bounce [animation-delay:0.2s]"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                      Loading more...
                    </div>
                  ) : !pagination.hasMore && products.length > 0 ? (
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">
                       You've reached the end
                    </div>
                  ) : null}
                </div>
              </section>

              <section className="space-y-20 border-t border-zinc-100 pt-20">
                <div>
                  <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-orange-500">
                        <Sparkles size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Special Offers</span>
                      </div>
                      <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">Ưu đãi đang diễn ra</h2>
                    </div>
                    <span className="rounded-full bg-zinc-100 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 shadow-sm border border-white">
                      {promotions.length} Active Programs
                    </span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    {promotions.map((promo) => (
                      <motion.article 
                        whileHover={{ y: -5 }}
                        key={promo.id} 
                        className={`group relative overflow-hidden rounded-3xl border p-8 shadow-sm transition-all hover:shadow-xl ${
                          promo.tone === 'amber' ? 'border-amber-200 bg-amber-50 text-amber-950' :
                          promo.tone === 'emerald' ? 'border-emerald-200 bg-emerald-50 text-emerald-950' :
                          'border-sky-200 bg-sky-50 text-sky-950'
                        }`}
                      >
                        <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                          <div>
                            <span className="inline-flex rounded-full bg-white/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
                              {promo.badge}
                            </span>
                            <h3 className="mt-6 text-2xl font-black leading-tight tracking-tight group-hover:text-brand transition-colors">{promo.title}</h3>
                          </div>
                          <p className="text-sm font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{promo.description}</p>
                        </div>
                        {/* Trang trí nền cho card promo */}
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/20 blur-2xl group-hover:bg-brand/10 transition-colors"></div>
                      </motion.article>
                    ))}
                  </div>
                </div>

                <div className="space-y-16">
                  <Carousel 
                    title="Best Sellers" 
                    subtitle="Bán chạy nhất" 
                    items={topCollections.bestSelling} 
                    metric="sold" 
                  />
                  <Carousel 
                    title="Most Viewed" 
                    subtitle="Xem nhiều nhất" 
                    items={topCollections.mostViewed} 
                    metric="views" 
                  />
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="mt-20 border-t border-zinc-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
           <span className="brand-mark brand-mark-sm mx-auto mb-6">US</span>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">© 2026 UrbanStep Store. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
}
