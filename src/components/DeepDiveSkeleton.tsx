import { Skeleton } from "@/components/ui/skeleton";

const DeepDiveSkeleton = () => (
  <div className="max-w-[430px] mx-auto px-5 py-6 flex flex-col gap-8 pb-20">
    {/* Company Overview skeleton */}
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-32 h-3 rounded" />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-16 h-16 rounded-2xl" />
        <div className="flex-1">
          <Skeleton className="w-40 h-5 rounded mb-2" />
          <Skeleton className="w-28 h-3 rounded" />
        </div>
      </div>
      <Skeleton className="w-full h-12 rounded mb-4" />
      <div className="grid grid-cols-2 gap-2.5">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    </section>

    {/* Stock Info skeleton */}
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-32 h-3 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    </section>

    {/* Financials skeleton */}
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-36 h-3 rounded" />
      </div>
      <div className="flex items-end gap-2 h-28 mb-5">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="flex-1 rounded-t-lg" style={{ height: `${30 + i * 15}%` }} />
        ))}
      </div>
    </section>

    {/* Key Metrics skeleton */}
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-24 h-3 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    </section>

    {/* News skeleton */}
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-28 h-3 rounded" />
      </div>
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 rounded-xl mb-3" />
      ))}
    </section>

    {/* Loading text */}
    <p className="text-center text-xs text-muted-foreground animate-pulse">
      Fetching live data via AI...
    </p>
  </div>
);

export default DeepDiveSkeleton;
