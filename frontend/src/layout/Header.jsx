import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { initials } from '../utils/helpers';
import { ShoppingCart, Package } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#/home" className="group flex min-w-0 items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95">
          <span className="brand-mark brand-mark-sm ring-4 ring-brand/10 group-hover:ring-brand/20 transition-all">US</span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-black tracking-tight text-ink">UrbanStep</span>
            <span className="block truncate text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-400">Sport Shoes Store</span>
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Order Tracking Link */}
          {user.role === 'member' && (
            <a 
              href="#/orders" 
              className="group flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-ink shadow-sm transition-all hover:bg-zinc-50 hover:border-brand/30"
              title="Theo dõi đơn hàng"
            >
              <Package size={16} className="text-zinc-400 group-hover:text-brand" />
              <span className="hidden md:inline">Đơn hàng</span>
            </a>
          )}

          {/* Cart Icon */}
          {user.role === 'member' && (
            <a 
              href="#/cart" 
              className="relative grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 text-zinc-600 transition-all hover:bg-zinc-200 hover:text-brand"
              title="Giỏ hàng"
            >
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-black text-white shadow-lg ring-2 ring-white">
                  {cart.totalItems}
                </span>
              )}
            </a>
          )}

          <div className="hidden items-center gap-3 rounded-xl border border-zinc-200/60 bg-white/50 px-3 py-2 shadow-sm sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-xs font-black text-brand ring-1 ring-brand/20">
              {initials(user.name)}
            </span>
            <span className="min-w-0 text-sm">
              <span className="block max-w-44 truncate font-bold text-ink">{user.name}</span>
              <span className="block text-[10px] font-semibold text-zinc-500 uppercase">
                {user.loyaltyRank} • {user.points} pts
              </span>
            </span>
          </div>
          <button 
            onClick={logout}
            className="focus-ring ui-button h-10 border border-zinc-200 bg-white px-5 text-sm font-bold text-ink shadow-sm transition-all hover:bg-zinc-50 hover:shadow active:scale-95"
          >
            <span className="hidden sm:inline">Đăng xuất</span>
            <span className="sm:hidden">Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
}
