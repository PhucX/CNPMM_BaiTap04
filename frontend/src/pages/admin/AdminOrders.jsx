import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { formatMoney } from '../../utils/helpers';
import { Search, Eye, Filter, ChevronUp, Clock, CheckCircle2, Truck, XCircle, AlertTriangle, Package } from 'lucide-react';

const STATUS_CONFIG = {
  1: { label: 'Đơn hàng mới', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
  2: { label: 'Đã xác nhận', icon: CheckCircle2, color: 'text-teal-500', bg: 'bg-teal-50', border: 'border-teal-100' },
  3: { label: 'Đang chuẩn bị hàng', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
  4: { label: 'Đang giao hàng', icon: Truck, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  5: { label: 'Đã giao thành công', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  6: { label: 'Đã hủy', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
  7: { label: 'Yêu cầu hủy', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' }
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearch] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = async () => {
    try {
      const data = await api('/api/admin/orders');
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

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await api(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      await fetchOrders();
    } catch (err) {
      alert('Cập nhật thất bại: ' + err.message);
    } finally {
      setUpdating(null);
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.shippingInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.shippingInfo.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-ink">Quản lý đơn hàng</h1>
        <p className="mt-1 text-sm font-medium text-zinc-500">Xem và xử lý các đơn hàng của khách hàng</p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-brand/20 transition-all">
         <div className="flex flex-1 items-center gap-3 px-3">
            <Search size={20} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Tìm theo Mã đơn, Tên khách hoặc Số điện thoại..." 
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-2 text-sm font-bold text-ink outline-none placeholder:font-medium placeholder:text-zinc-400"
            />
         </div>
         <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-500 hover:bg-zinc-100 transition-colors">
            <Filter size={18} />
         </button>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Mã đơn hàng</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Khách hàng</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Thời gian</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Tổng tiền</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Trạng thái</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan="6" className="px-6 py-6"><div className="h-10 w-full animate-shimmer rounded-xl bg-zinc-100"></div></td></tr>
                ))
              ) : filteredOrders.map((order) => {
                const status = STATUS_CONFIG[order.status];
                const isExpanded = expandedOrder === order.id;

                return (
                  <React.Fragment key={order.id}>
                    <tr className={`group transition-colors ${isExpanded ? 'bg-zinc-50/50' : 'hover:bg-zinc-50/30'}`}>
                      <td className="px-6 py-4">
                        <span className="font-black text-ink">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="min-w-0">
                          <p className="font-bold text-ink">{order.shippingInfo.name}</p>
                          <p className="text-[10px] text-zinc-400">{order.shippingInfo.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-zinc-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                        <p className="text-[10px] font-bold text-zinc-400">{new Date(order.createdAt).toLocaleTimeString('vi-VN')}</p>
                      </td>
                      <td className="px-6 py-4 font-black text-brand">
                        {formatMoney(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 rounded-full ${status.bg} ${status.color} border ${status.border} px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm`}>
                          <status.icon size={12} />
                          {status.label}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button 
                           onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                           className="grid h-10 w-10 place-items-center rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-brand transition-all shadow-sm"
                         >
                            {isExpanded ? <ChevronUp size={20} /> : <Eye size={18} />}
                         </button>
                      </td>
                    </tr>
                    
                    {/* Expanded View */}
                    <AnimatePresence>
                      {isExpanded && (
                        <tr>
                          <td colSpan="6" className="px-8 py-8 bg-zinc-50/30">
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                               <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
                                  <div className="space-y-8">
                                     <section>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Sản phẩm đơn hàng</h4>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                           {order.items.map((item, idx) => (
                                              <div key={idx} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
                                                 <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                                                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                                                 </div>
                                                 <div className="min-w-0 flex-1">
                                                    <p className="truncate text-xs font-black text-ink">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-zinc-400">Size {item.size} • Màu {item.color} • SL {item.quantity}</p>
                                                    <p className="mt-1 text-xs font-black text-brand">{formatMoney(item.price)}</p>
                                                 </div>
                                              </div>
                                           ))}
                                        </div>
                                     </section>

                                     <section>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Lịch sử trạng thái</h4>
                                        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                                           <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-zinc-100">
                                              {order.history.slice().reverse().map((log, idx) => (
                                                <div key={idx} className="relative">
                                                   <div className={`absolute -left-[22px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white ${idx === 0 ? 'bg-brand' : 'bg-zinc-200'}`}></div>
                                                   <p className={`text-xs font-black ${idx === 0 ? 'text-ink' : 'text-zinc-400'}`}>{STATUS_CONFIG[log.status].label}</p>
                                                   <p className="text-[10px] font-bold text-zinc-400">{new Date(log.timestamp).toLocaleString('vi-VN')}</p>
                                                   {log.note && <p className="mt-1 text-[11px] font-medium text-zinc-500 italic">"{log.note}"</p>}
                                                </div>
                                              ))}
                                           </div>
                                        </div>
                                     </section>
                                  </div>

                                  <aside className="space-y-6">
                                     <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Cập nhật trạng thái</h4>
                                        <div className="grid gap-2">
                                           {[2, 3, 4, 5, 6].map(st => (
                                              <button 
                                                key={st}
                                                disabled={updating === order.id || order.status === st}
                                                onClick={() => handleUpdateStatus(order.id, st)}
                                                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                                                  order.status === st 
                                                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' 
                                                    : 'bg-zinc-50 text-ink hover:bg-ink hover:text-white'
                                                }`}
                                              >
                                                 {STATUS_CONFIG[st].label}
                                              </button>
                                           ))}
                                        </div>
                                        {order.status === 7 && (
                                          <div className="mt-4 rounded-xl bg-amber-50 p-4 border border-amber-100">
                                             <p className="text-[10px] font-bold text-amber-700 uppercase mb-2">Yêu cầu hủy từ khách</p>
                                             <button 
                                               onClick={() => handleUpdateStatus(order.id, 6)}
                                               className="w-full rounded-lg bg-red-600 py-2 text-[10px] font-black text-white uppercase"
                                             >Chấp nhận hủy</button>
                                          </div>
                                        )}
                                     </div>

                                     <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Địa chỉ giao hàng</h4>
                                        <p className="text-xs font-bold text-ink">{order.shippingInfo.name}</p>
                                        <p className="text-xs font-bold text-zinc-400 mt-1">{order.shippingInfo.phone}</p>
                                        <p className="text-xs font-medium text-zinc-500 mt-3 leading-relaxed">{order.shippingInfo.address}</p>
                                        {order.shippingInfo.note && <p className="mt-4 rounded-xl bg-zinc-50 p-3 text-[10px] italic text-zinc-400">Note: {order.shippingInfo.note}</p>}
                                     </div>
                                  </aside>
                               </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
