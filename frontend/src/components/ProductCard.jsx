import { motion } from 'framer-motion';
import { formatMoney } from '../utils/helpers';
import { Star, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }) {
  const handleLink = () => {
    window.location.hash = `#/product/${encodeURIComponent(product.slug)}`;
  };

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-brand/5"
    >
      <button onClick={handleLink} className="block w-full text-left">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={product.images[0]} 
            alt={product.name} 
            className="h-full w-full object-cover" 
            loading="lazy" 
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.discountPercent > 0 && (
              <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                -{product.discountPercent}%
              </span>
            )}
            {product.isNew && (
              <span className="rounded-full bg-brand px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                New
              </span>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-brand/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <span className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-brand shadow-lg transform translate-y-4 transition-transform group-hover:translate-y-0">
               Xem chi tiết
             </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-black uppercase tracking-widest text-brand/70">{product.category.name}</p>
              <h3 className="mt-1 truncate text-lg font-black tracking-tight text-ink group-hover:text-brand transition-colors">{product.name}</h3>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-black text-zinc-600 shadow-sm">
              <Star size={12} className="fill-brand text-brand" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="mt-3 line-clamp-2 min-h-[40px] text-xs font-medium leading-relaxed text-zinc-400 group-hover:text-zinc-500 transition-colors">
            {product.summary}
          </p>
          <div className="mt-5 flex items-end justify-between gap-3 pt-4 border-t border-zinc-50">
            <div>
              <p className="text-xl font-black tracking-tight text-ink">{formatMoney(product.price)}</p>
              {product.originalPrice > product.price && (
                <p className="text-xs font-bold text-zinc-300 line-through decoration-brand/30">{formatMoney(product.originalPrice)}</p>
              )}
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                product.stock > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}></span>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
