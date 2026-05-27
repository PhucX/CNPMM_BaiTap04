import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import { Package, FolderTree, AlertCircle, TrendingUp, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await api('/api/admin/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const statCards = [
    { name: 'Tổng sản phẩm', value: stats.totalProducts, icon: Package, color: 'bg-blue-500', trend: '+12% so với tháng trước' },
    { name: 'Danh mục', value: stats.totalCategories, icon: FolderTree, color: 'bg-teal-500', trend: 'Hoạt động ổn định' },
    { name: 'Hết hàng', value: stats.outOfStock, icon: AlertCircle, color: 'bg-red-500', trend: 'Cần nhập thêm ngay' },
    { name: 'Sắp hết hàng', value: stats.lowStock, icon: TrendingUp, color: 'bg-orange-500', trend: 'Ít hơn 5 sản phẩm' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-ink">Bảng điều khiển</h1>
        <p className="mt-2 text-sm font-medium text-zinc-500 flex items-center gap-2">
          <Calendar size={14} />
          Thứ Tư, 20 tháng 5, 2026
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={card.name} 
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50"
            >
              <div className="flex items-start justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${card.color} text-white shadow-lg`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{card.name}</p>
                <h3 className="mt-1 text-3xl font-black text-ink">{card.value}</h3>
              </div>
              <p className="mt-4 text-[10px] font-black uppercase text-zinc-300 tracking-tighter">
                {card.trend}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
         <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-10 shadow-sm">
            <h3 className="text-xl font-black text-ink">Biểu đồ tăng trưởng</h3>
            <div className="mt-8 flex h-64 items-center justify-center rounded-3xl bg-zinc-50 border border-dashed border-zinc-200">
               <p className="text-sm font-bold text-zinc-400">Biểu đồ sẽ được hiển thị tại đây</p>
            </div>
         </div>
         <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-10 shadow-sm">
            <h3 className="text-xl font-black text-ink">Hoạt động gần đây</h3>
            <div className="mt-8 space-y-6">
               {[1,2,3,4].map(i => (
                 <div key={i} className="flex gap-4">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-brand shrink-0"></div>
                    <div>
                       <p className="text-sm font-bold text-ink">Admin đã cập nhật sản phẩm #P-00{i}</p>
                       <p className="text-[10px] font-bold text-zinc-400 uppercase mt-0.5">2 giờ trước</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
