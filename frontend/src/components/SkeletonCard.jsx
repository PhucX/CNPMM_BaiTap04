export default function SkeletonCard() {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="animate-shimmer aspect-[4/3] w-full bg-zinc-100"></div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between gap-3">
          <div className="animate-shimmer h-4 w-1/3 rounded bg-zinc-100"></div>
          <div className="animate-shimmer h-4 w-1/4 rounded bg-zinc-100"></div>
        </div>
        <div className="animate-shimmer h-6 w-3/4 rounded bg-zinc-100"></div>
        <div className="animate-shimmer h-10 w-full rounded bg-zinc-100"></div>
        <div className="flex justify-between items-end gap-3 pt-2">
          <div className="space-y-2 w-1/2">
            <div className="animate-shimmer h-6 w-full rounded bg-zinc-100"></div>
            <div className="animate-shimmer h-4 w-2/3 rounded bg-zinc-100"></div>
          </div>
          <div className="animate-shimmer h-4 w-1/4 rounded bg-zinc-100"></div>
        </div>
      </div>
    </article>
  );
}
