import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../layout/Header';
import CompactProductCard from '../components/CompactProductCard';
import Loading from '../components/Loading';
import { api } from '../services/api';
import { formatMoney } from '../utils/helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, EffectFade } from 'swiper/modules';
import { Star, ChevronLeft, ShieldCheck, Truck, RefreshCw, Minus, Plus, ShoppingCart } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function ProductDetail({ slug }) {
  const { user, loading: authLoading } = useAuth();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError('');
      try {
        const data = await api(`/api/products/${encodeURIComponent(slug)}`);
        setProduct(data.product);
        setRelated(data.related);
        setQuantity(data.product.stock > 0 ? 1 : 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProduct();
    }
    window.scrollTo(0, 0);
  }, [slug, user]);

  if (authLoading || loading) return <Loading message="Đang lấy thông tin sản phẩm..." />;
  if (!user) return null;

  if (error || !product) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-zinc-400 mb-8">
             <Star size={40} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-ink">Không tìm thấy sản phẩm</h1>
          <p className="mt-4 text-zinc-500 font-medium">{error || "Sản phẩm bạn yêu cầu không tồn tại hoặc đã bị gỡ bỏ."}</p>
          <a href="#/home" className="mt-10 inline-flex rounded-2xl bg-brand px-8 py-4 text-sm font-black text-white shadow-xl shadow-brand/20 transition-transform hover:scale-105 active:scale-95">
            Quay lại cửa hàng
          </a>
        </main>
      </div>
    );
  }

  const quantityDisabled = product.stock <= 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-paper pb-20"
    >
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <button 
          onClick={() => window.location.hash = '#/home'}
          className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-brand transition-colors"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Quay lại trang chủ
        </button>

        <section className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Gallery */}
          <div className="min-w-0">
            <Swiper
              modules={[Navigation, Pagination, EffectFade]}
              effect="fade"
              spaceBetween={0}
              slidesPerView={1}
              navigation={product.images.length > 1}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="product-swiper overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/50"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/3] bg-zinc-50">
                    <img src={image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
               <div className="flex flex-col items-center text-center p-4 rounded-3xl bg-white border border-zinc-100 shadow-sm">
                  <Truck size={20} className="text-brand mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-ink">Free Shipping</span>
               </div>
               <div className="flex flex-col items-center text-center p-4 rounded-3xl bg-white border border-zinc-100 shadow-sm">
                  <ShieldCheck size={20} className="text-brand mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-ink">2 Year Warranty</span>
               </div>
               <div className="flex flex-col items-center text-center p-4 rounded-3xl bg-white border border-zinc-100 shadow-sm">
                  <RefreshCw size={20} className="text-brand mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-ink">30-Day Return</span>
               </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand">
                  {product.category.name}
                </span>
                {product.isNew && (
                  <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    Mới về
                  </span>
                )}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-ink sm:text-5xl">{product.name}</h1>
              
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-orange-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-current" : "text-zinc-200"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-ink">{product.rating.toFixed(1)}</span>
                  <span className="text-sm font-medium text-zinc-400">({product.reviewCount} reviews)</span>
                </div>
                <div className="h-4 w-px bg-zinc-200"></div>
                <span className="text-sm font-bold text-zinc-600">Đã bán {product.sold}</span>
              </div>

              <p className="mt-8 text-lg leading-relaxed text-zinc-500 font-medium">{product.description}</p>

              <div className="mt-10 rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="text-4xl font-black tracking-tight text-ink">{formatMoney(product.price)}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg font-bold text-zinc-300 line-through">{formatMoney(product.originalPrice)}</span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-accent/20">
                      Tiết kiệm {product.discountPercent}%
                    </span>
                  )}
                </div>

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Màu sắc</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, i) => (
                        <button key={i} className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-bold text-ink transition-all hover:border-brand hover:bg-white active:scale-95">
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Kích cỡ</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, i) => (
                        <button key={i} className="grid h-10 min-w-[3rem] place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-xs font-bold text-ink transition-all hover:border-brand hover:bg-white active:scale-95">
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <div className="inline-flex h-14 items-center rounded-2xl border border-zinc-200 bg-zinc-50 p-1">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      disabled={quantityDisabled}
                      className="focus-ring grid h-12 w-12 place-items-center rounded-xl text-ink transition-all hover:bg-white hover:shadow-sm disabled:opacity-30"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="grid w-12 place-items-center text-sm font-black text-ink">{quantity}</span>
                    <button 
                      onClick={() => {
                        if (quantity < product.stock) {
                          setQuantity(prev => prev + 1);
                          setCartMessage('');
                        } else {
                          setCartMessage('Số lượng đã đạt tối đa tồn kho.');
                        }
                      }}
                      disabled={quantityDisabled}
                      className="focus-ring grid h-12 w-12 place-items-center rounded-xl text-ink transition-all hover:bg-white hover:shadow-sm disabled:opacity-30"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCartMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng mẫu.`)}
                    disabled={quantityDisabled}
                    className="flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl bg-brand px-8 text-sm font-black text-white shadow-xl shadow-brand/20 transition-all hover:bg-teal-700 disabled:bg-zinc-200 disabled:shadow-none"
                  >
                    <ShoppingCart size={20} />
                    {product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {cartMessage && (
                    <motion.p 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 text-center text-xs font-bold text-brand uppercase tracking-widest"
                    >
                      {cartMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-12 rounded-[2rem] border border-zinc-200 bg-white p-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Thông số kỹ thuật</h2>
              <ul className="grid gap-4 text-sm font-bold text-ink sm:grid-cols-2">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-brand shadow-[0_0_8px_rgba(13,148,136,0.5)]"></div>
                    <span className="text-zinc-600">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">Gợi ý thêm</p>
              <h2 className="text-3xl font-black tracking-tight text-ink">Sản phẩm tương tự</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.length > 0 ? (
              related.map(item => <CompactProductCard key={item.id} product={item} />)
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-zinc-200 bg-white px-5 py-12 text-center text-sm font-bold text-zinc-400 uppercase tracking-widest">
                Chưa có sản phẩm tương tự
              </div>
            )}
          </div>
        </section>
      </main>
    </motion.div>
  );
}
