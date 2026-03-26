import { Skeleton } from "@/components/ui/skeleton";

const FeedSkeleton = () => (
  <div className="h-screen w-full snap-start flex items-center justify-center px-5 py-8">
    <div className="w-full max-w-[375px] flex flex-col gap-5">
      <Skeleton className="h-7 w-24 rounded-full" />
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3.5 w-24" />
        </div>
      </div>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);

export default FeedSkeleton;
