import { useState } from 'react';
import TopProductCard from './TopProductCard';

export default function Carousel({ title, subtitle, items, metric }) {
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  
  const start = page * pageSize;
  const visibleItems = items.slice(start, start + pageSize);

  const handlePrev = () => setPage(prev => Math.max(0, prev - 1));
  const handleNext = () => setPage(prev => Math.min(totalPages - 1, prev + 1));

  return (
    <section className="rounded border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">{subtitle}</p>
          <h3 className="mt-1 text-lg font-black text-ink">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-white px-2.5 py-1.5 text-xs font-bold text-zinc-500">
            Trang {page + 1}/{totalPages}
          </span>
          <button 
            onClick={handlePrev}
            disabled={page === 0}
            className="focus-ring grid h-9 w-9 place-items-center rounded border border-zinc-300 bg-white text-sm font-black text-ink disabled:text-zinc-300"
          >
            &lsaquo;
          </button>
          <button 
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="focus-ring grid h-9 w-9 place-items-center rounded border border-zinc-300 bg-white text-sm font-black text-ink disabled:text-zinc-300"
          >
            &rsaquo;
          </button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {visibleItems.length > 0 ? (
          visibleItems.map((product, index) => (
            <TopProductCard 
              key={product.id} 
              product={product} 
              rank={start + index + 1} 
              metric={metric} 
            />
          ))
        ) : (
          <div className="rounded border border-dashed border-zinc-300 px-5 py-8 text-center text-sm font-medium text-zinc-500 sm:col-span-2 xl:col-span-5">
            Chưa có dữ liệu sản phẩm.
          </div>
        )}
      </div>
    </section>
  );
}
