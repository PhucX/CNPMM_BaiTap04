import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Header from '../layout/Header';
import { formatMoney } from '../utils/helpers';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, loading } = useCart();

  const subtotal = cart.subtotal || 0;
  const shipping = subtotal > 1000000 ? 0 : 30000;
  const total = subtotal + shipping;

  if (loading && cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-20 text-center">
           <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-ink">Giỏ hàng của bạn</h1>
            <p className="mt-2 text-sm font-medium text-zinc-500">Bạn đang có {cart.totalItems} sản phẩm trong túi.</p>
          </div>
          <button 
            onClick={() => window.location.hash = '#/home'}
            className="group flex items-center gap-2 text-sm font-bold text-brand"
          >
            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Tiếp tục mua sắm
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="rounded-[3rem] border-2 border-dashed border-zinc-200 bg-white px-5 py-32 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-50 text-zinc-300">
               <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-black text-ink">Giỏ hàng trống</h2>
            <p className="mt-2 text-zinc-500">Có vẻ như bạn chưa chọn được đôi giày ưng ý nào.</p>
            <button 
              onClick={() => window.location.hash = '#/home'}
              className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-ink px-8 py-4 text-sm font-black text-white shadow-xl shadow-zinc-200 transition-all hover:bg-zinc-800 active:scale-95"
            >
              Xem cửa hàng ngay
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* List */}
            <div className="space-y-4">
              <AnimatePresence mode='popLayout'>
                {cart.items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-6"
                  >
                    <div className="flex gap-6">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 sm:h-32 sm:w-32">
                        <img src={item.product?.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand/70">{item.product?.category}</p>
                            <h3 className="mt-1 text-base font-black text-ink sm:text-lg">{item.product?.name}</h3>
                            <div className="mt-2 flex flex-wrap gap-3">
                               <span className="inline-flex items-center rounded-lg bg-zinc-100 px-2 py-1 text-[10px] font-bold text-zinc-500 ring-1 ring-zinc-200">Màu: {item.color}</span>
                               <span className="inline-flex items-center rounded-lg bg-zinc-100 px-2 py-1 text-[10px] font-bold text-zinc-500 ring-1 ring-zinc-200">Size: {item.size}</span>
                            </div>
                          </div>
                          <p className="text-lg font-black text-ink">{formatMoney(item.product?.price)}</p>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-0.5">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="grid h-8 w-8 place-items-center rounded-lg text-ink transition-all hover:bg-white hover:shadow-sm"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-xs font-black text-ink">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="grid h-8 w-8 place-items-center rounded-lg text-ink transition-all hover:bg-white hover:shadow-sm"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 transition-all hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <aside>
              <div className="sticky top-28 rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-black text-ink">Tổng đơn hàng</h2>
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-sm font-bold text-zinc-500">
                    <span>Tạm tính</span>
                    <span className="text-ink">{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-zinc-500">
                    <span>Phí vận chuyển</span>
                    <span>{shipping === 0 ? 'Miễn phí' : formatMoney(shipping)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] font-bold text-brand bg-brand/5 p-2 rounded-lg text-center uppercase tracking-widest">
                       Mua thêm {formatMoney(1000000 - subtotal)} để được FREE ship
                    </p>
                  )}
                  <div className="my-6 h-px bg-zinc-100"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black uppercase text-zinc-400 tracking-widest">Tổng cộng</span>
                    <span className="text-3xl font-black tracking-tight text-ink">{formatMoney(total)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => window.location.hash = '#/checkout'}
                  className="mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-brand text-sm font-black text-white shadow-xl shadow-brand/20 transition-all hover:bg-teal-700 active:scale-[0.98]"
                >
                  Tiến hành thanh toán
                  <ArrowRight size={20} />
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-6 opacity-40 grayscale grayscale-0 hover:grayscale-0 transition-all">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-3 object-contain" alt="Visa" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-5 object-contain" alt="Mastercard" />
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
