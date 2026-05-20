import { motion } from 'framer-motion';
import { formatMoney } from '../utils/helpers';

export default function CompactProductCard({ product }) {
  const handleLink = () => {
    window.location.hash = `#/product/${encodeURIComponent(product.slug)}`;
  };

  return (
    <motion.article 
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-lg"
    >
      <button onClick={handleLink} className="block w-full text-left">
        <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        </div>
        <div className="p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand/70">{product.category?.name}</p>
          <h3 className="mt-1 truncate text-sm font-black text-ink group-hover:text-brand transition-colors">{product.name}</h3>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-zinc-50 pt-3">
            <span className="text-sm font-black text-ink">{formatMoney(product.price)}</span>
            <span className="text-[10px] font-bold text-zinc-400">Sold {product.sold}</span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
