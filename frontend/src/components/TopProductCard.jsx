import { motion } from 'framer-motion';
import { formatMoney } from '../utils/helpers';

export default function TopProductCard({ product, rank, metric }) {
  const handleLink = () => {
    window.location.hash = `#/product/${encodeURIComponent(product.slug)}`;
  };

  const metricText = metric === "views" ? `${product.viewCount} views` : `${product.sold} sold`;

  return (
    <motion.article 
      whileHover={{ y: -4 }}
      className="group min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg"
    >
      <button onClick={handleLink} className="block w-full text-left">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-[10px] font-black text-white shadow-lg">#{rank}</span>
          </div>
        </div>
        <div className="p-4">
          <p className="truncate text-[10px] font-black uppercase tracking-widest text-brand/70">{product.category?.name}</p>
          <h3 className="mt-1 truncate text-sm font-black text-ink group-hover:text-brand transition-colors">{product.name}</h3>
          <div className="mt-3 space-y-0.5 border-t border-zinc-50 pt-3">
            <p className="text-sm font-black text-ink">{formatMoney(product.price)}</p>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{metricText}</p>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
