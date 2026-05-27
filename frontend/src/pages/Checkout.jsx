import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Header from '../layout/Header';
import { formatMoney } from '../utils/helpers';
import { api } from '../services/api';
import { ChevronLeft, CreditCard, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { cart, refreshCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  const subtotal = cart.subtotal || 0;
  const shipping = subtotal > 1000000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          shippingInfo: formData,
          paymentMethod: 'COD'
        })
      });
      setSuccess(true);
      refreshCart(); // Clear local cart state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-32 text-center">
           <motion.div 
             initial={{ scale: 0.5, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
           >
              <CheckCircle2 size={48} />
           </motion.div>
           <h1 className="text-4xl font-black tracking-tight text-ink">Đặt hàng thành công!</h1>
           <p className="mt-4 text-zinc-500 font-medium leading-relaxed">
             Cảm ơn bạn đã tin tưởng UrbanStep. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao tới địa chỉ của bạn.
           </p>
           <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button 
                onClick={() => window.location.hash = '#/orders'}
                className="rounded-2xl bg-ink px-8 py-4 text-sm font-black text-white shadow-xl shadow-zinc-200 transition-all hover:bg-zinc-800"
              >
                Theo dõi đơn hàng
              </button>
              <button 
                onClick={() => window.location.hash = '#/home'}
                className="rounded-2xl border border-zinc-200 bg-white px-8 py-4 text-sm font-black text-ink shadow-sm transition-all hover:bg-zinc-50"
              >
                Tiếp tục mua sắm
              </button>
           </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <button 
          onClick={() => window.location.hash = '#/cart'}
          className="group mb-10 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-brand transition-colors"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Quay lại giỏ hàng
        </button>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          {/* Form */}
          <div className="space-y-8">
            <section>
              <h1 className="text-3xl font-black tracking-tight text-ink">Thông tin giao hàng</h1>
              <p className="mt-2 text-sm font-medium text-zinc-500 font-semibold uppercase tracking-widest text-brand">Vui lòng nhập đầy đủ thông tin bên dưới</p>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Họ và tên người nhận</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="focus-ring h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-bold text-ink outline-none transition-all placeholder:font-medium focus:border-brand/30" 
                      required 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Số điện thoại</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại liên hệ..."
                      className="focus-ring h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-bold text-ink outline-none transition-all placeholder:font-medium focus:border-brand/30" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Địa chỉ giao hàng</label>
                  <input 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                    className="focus-ring h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-bold text-ink outline-none transition-all placeholder:font-medium focus:border-brand/30" 
                    required 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Ghi chú (Tùy chọn)</label>
                  <textarea 
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Ghi chú thêm cho shop hoặc shipper..."
                    className="focus-ring w-full rounded-2xl border border-zinc-200 bg-white p-5 text-sm font-bold text-ink outline-none transition-all placeholder:font-medium focus:border-brand/30" 
                  />
                </div>
              </form>
            </section>

            <section className="rounded-[2.5rem] bg-ink p-10 text-white shadow-2xl shadow-zinc-200">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 grid place-items-center backdrop-blur-md">
                     <CreditCard size={24} className="text-brand" />
                  </div>
                  <div>
                     <h3 className="text-lg font-black tracking-tight">Phương thức thanh toán</h3>
                     <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Mặc định hiện tại</p>
                  </div>
               </div>
               <div className="flex items-center justify-between rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <div className="flex items-center gap-4">
                     <div className="h-4 w-4 rounded-full border-4 border-brand bg-white"></div>
                     <span className="text-sm font-bold">Thanh toán khi nhận hàng (COD)</span>
                  </div>
                  <CheckCircle2 size={20} className="text-brand" />
               </div>
               <p className="mt-6 text-[11px] leading-relaxed text-white/40">
                  Bạn sẽ thực hiện thanh toán trực tiếp cho nhân viên giao hàng sau khi đã kiểm tra và nhận kiện hàng.
               </p>
            </section>
          </div>

          {/* Summary */}
          <aside>
            <div className="sticky top-28 space-y-6">
              <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-black text-ink">Tóm tắt đơn hàng</h2>
                
                <div className="mt-8 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                       <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
                          <img src={item.product?.image} alt="" className="h-full w-full object-cover" />
                       </div>
                       <div className="min-w-0 flex-1 py-1">
                          <p className="truncate text-xs font-black text-ink">{item.product?.name}</p>
                          <p className="mt-0.5 text-[10px] font-bold text-zinc-400">Size: {item.size} • Qty: {item.quantity}</p>
                          <p className="mt-1 text-xs font-black text-brand">{formatMoney(item.product?.price)}</p>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4 pt-8 border-t border-zinc-50">
                  <div className="flex justify-between text-sm font-bold text-zinc-500">
                    <span>Tạm tính</span>
                    <span className="text-ink">{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-zinc-500">
                    <span>Phí giao hàng</span>
                    <span>{shipping === 0 ? 'Miễn phí' : formatMoney(shipping)}</span>
                  </div>
                  <div className="my-6 h-px bg-zinc-100"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black uppercase text-zinc-400 tracking-widest">Tổng cộng</span>
                    <span className="text-3xl font-black tracking-tight text-ink">{formatMoney(total)}</span>
                  </div>
                </div>

                <button 
                  form="checkout-form"
                  disabled={loading || cart.items.length === 0}
                  className="mt-10 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-brand text-sm font-black text-white shadow-xl shadow-brand/20 transition-all hover:bg-teal-700 disabled:bg-zinc-200"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      Đặt hàng ngay
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {error && <p className="mt-4 text-center text-xs font-bold text-red-600 uppercase tracking-widest">{error}</p>}
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                 <div className="flex items-center gap-3 text-emerald-600">
                    <ShieldCheck size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">Bảo mật thanh toán</span>
                 </div>
                 <p className="mt-2 text-[10px] font-medium text-zinc-400">
                    Mọi thông tin cá nhân của bạn đều được mã hóa và bảo mật tuyệt đối theo tiêu chuẩn quốc tế.
                 </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
