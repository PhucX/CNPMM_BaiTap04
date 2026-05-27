import { useAuth } from '../context/AuthContext';
import { initials } from '../utils/helpers';
import { LayoutDashboard, ShoppingCart, LogOut, Package, Users, Settings } from 'lucide-react';

export default function AdminLayout({ children, currentPath }) {
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Tổng quan', path: '#/admin/dashboard', icon: LayoutDashboard },
    { name: 'Sản phẩm', path: '#/admin/products', icon: Package },
    { name: 'Đơn hàng', path: '#/admin/orders', icon: ShoppingCart },
    { name: 'Khách hàng', path: '#/admin/users', icon: Users },
    { name: 'Cài đặt', path: '#/admin/settings', icon: Settings },
  ];

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-zinc-200 bg-white">
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center border-b border-zinc-100 px-8">
            <a href="#/admin/dashboard" className="flex items-center gap-3">
              <span className="brand-mark brand-mark-sm bg-ink">AD</span>
              <span className="text-xl font-black tracking-tight text-ink">UrbanStep</span>
            </a>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.name}
                  href={item.path}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-ink text-white shadow-lg shadow-zinc-200' 
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-ink'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-brand' : 'text-zinc-400 group-hover:text-ink'} />
                  {item.name}
                </a>
              );
            })}
          </nav>

          <div className="border-t border-zinc-100 p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200/50">
               <div className="h-10 w-10 rounded-xl bg-ink grid place-items-center text-xs font-black text-white">
                  {initials(user.name)}
               </div>
               <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{user.name}</p>
                  <p className="truncate text-[10px] font-black uppercase text-zinc-400">Administrator</p>
               </div>
               <button 
                 onClick={logout}
                 className="h-8 w-8 rounded-lg bg-white border border-zinc-200 grid place-items-center text-zinc-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
               >
                 <LogOut size={16} />
               </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 pb-12">
        <header className="sticky top-0 z-40 h-20 border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl">
           <div className="flex h-full items-center justify-between px-8">
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">Admin Control Panel</h2>
              <div className="flex items-center gap-4">
                 <a href="#/home" className="text-xs font-bold text-brand hover:underline">View Storefront</a>
              </div>
           </div>
        </header>
        <div className="px-8 pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
