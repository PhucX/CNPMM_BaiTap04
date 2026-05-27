import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../layout/Header';
import { api } from '../services/api';
import { formatMoney } from '../utils/helpers';
import { Package, Clock, Truck, CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp, MapPin, Phone, User } from 'lucide-react';

const STATUS_CONFIG = {
  1: { label: 'Đơn hàng mới', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
  2: { label: 'Đã xác nhận', icon: CheckCircle2, color: 'text-teal-500', bg: 'bg-teal-50' },
  3: { label: 'Đang chuẩn bị hàng', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
  4: { label: 'Đang giao hàng', icon: Truck, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  5: { label: 'Đã giao thành công', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  6: { label: 'Đã hủy', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  7: { label: 'Yêu cầu hủy', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' }
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const data = await api('/api/orders');
      setOrders(data.items);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) return;
    
    try {
      const res = await api(`/api/orders/${orderId}/cancel`, { method: 'POST' });
      alert(res.message);
      fetchOrders(); // Refresh list
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">
         <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent"></div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-ink">Lịch sử mua hàng</h1>
          <p className="mt-2 text-sm font-medium text-zinc-500 uppercase tracking-widest text-brand">Theo dõi và quản lý các đơn hàng của bạn</p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[3rem] border-2 border-dashed border-zinc-200 bg-white px-5 py-32 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-50 text-zinc-300">
               <Package size={40} />
            </div>
            <h2 className="text-2xl font-black text-ink">Bạn chưa có đơn hàng nào</h2>
            <p className="mt-2 text-zinc-500">Hãy chọn cho mình một đôi giày ưng ý và bắt đầu hành trình cùng UrbanStep.</p>
            <button 
              onClick={() => window.location.hash = '#/home'}
              className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-ink px-8 py-4 text-sm font-black text-white shadow-xl shadow-zinc-200 transition-all hover:bg-zinc-800"
            >
              Khám phá cửa hàng
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = STATUS_CONFIG[order.status];
              const StatusIcon = status.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <motion.div 
                  layout
                  key={order.id} 
                  className="overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  {/* Summary Header */}
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Order ID: {order.id}</p>
                        <h3 className="text-lg font-black text-ink">Đặt ngày {new Date(order.createdAt).toLocaleDateString('vi-VN')}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className={`flex items-center gap-2 rounded-full ${status.bg} ${status.color} px-4 py-2 text-[10px] font-black uppercase tracking-wider`}>
                            <StatusIcon size={14} />
                            {status.label}
                         </div>
                         <button 
                           onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                           className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-50 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-ink"
                         >
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                         </button>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Tổng thanh toán</p>
                          <p className="text-xl font-black text-ink">{formatMoney(order.total)}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Sản phẩm</p>
                          <p className="text-sm font-bold text-zinc-600">{order.items.length} món hàng</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Phương thức</p>
                          <p className="text-sm font-bold text-zinc-600">{order.paymentMethod}</p>
                       </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-zinc-100 bg-zinc-50/30 px-6 py-8 sm:px-8"
                      >
                        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
                           {/* Details & Items */}
                           <div className="space-y-8">
                              <section>
                                 <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Sản phẩm đã đặt</h4>
                                 <div className="space-y-3">
                                    {order.items.map((item, idx) => (
                                      <div key={idx} className="flex gap-4 rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm">
                                         <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                                            <img src={item.image} alt="" className="h-full w-full object-cover" />
                                         </div>
                                         <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-black text-ink">{item.name}</p>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase">Size: {item.size} • Màu: {item.color} • SL: {item.quantity}</p>
                                            <p className="mt-1 text-xs font-black text-brand">{formatMoney(item.price)}</p>
                                         </div>
                                      </div>
                                    ))}
                                 </div>
                              </section>

                              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                                 <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Trạng thái vận chuyển</h4>
                                 <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-zinc-100">
                                    {order.history.slice().reverse().map((log, idx) => {
                                      const logStatus = STATUS_CONFIG[log.status];
                                      return (
                                        <div key={idx} className="relative">
                                           <div className={`absolute -left-[30px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white ring-4 ring-white ${idx === 0 ? 'bg-brand shadow-[0_0_8px_rgba(13,148,136,0.5)]' : 'bg-zinc-200'}`}></div>
                                           <div className="flex flex-col gap-1">
                                              <p className={`text-sm font-black ${idx === 0 ? 'text-ink' : 'text-zinc-400'}`}>{logStatus.label}</p>
                                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{new Date(log.timestamp).toLocaleString('vi-VN')}</p>
                                              {log.note && <p className="mt-1 text-xs font-medium text-zinc-500">{log.note}</p>}
                                           </div>
                                        </div>
                                      );
                                    })}
                                 </div>
                              </section>
                           </div>

                           {/* Info & Actions */}
                           <aside className="space-y-6">
                              <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Thông tin nhận hàng</h4>
                                 <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                       <User size={14} className="mt-0.5 text-zinc-400" />
                                       <p className="text-xs font-bold text-ink">{order.shippingInfo.name}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                       <Phone size={14} className="mt-0.5 text-zinc-400" />
                                       <p className="text-xs font-bold text-ink">{order.shippingInfo.phone}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                       <MapPin size={14} className="mt-0.5 text-zinc-400" />
                                       <p className="text-xs font-medium leading-relaxed text-zinc-500">{order.shippingInfo.address}</p>
                                    </div>
                                 </div>
                              </section>

                              {(order.status === 1 || order.status === 2 || order.status === 3) && (
                                <button 
                                  onClick={() => handleCancel(order.id)}
                                  className="w-full rounded-2xl border border-red-100 bg-red-50 py-4 text-xs font-black uppercase tracking-widest text-red-600 transition-all hover:bg-red-600 hover:text-white"
                                >
                                   {order.status === 3 ? 'Gửi yêu cầu hủy đơn' : 'Hủy đơn hàng'}
                                </button>
                              )}

                              <div className="rounded-2xl bg-zinc-100/50 p-4 text-[10px] font-medium leading-relaxed text-zinc-400">
                                 Lưu ý: Bạn chỉ có thể tự hủy đơn hàng trong vòng 30 phút đầu kể từ khi đặt. Sau thời gian này hoặc khi shop đã chuẩn bị hàng, bạn cần gửi yêu cầu để được phê duyệt.
                              </div>
                           </aside>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
