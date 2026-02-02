import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

// Skeleton específico para cards de galeria
function GallerySkeleton({ className }) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

// Skeleton para grid de galeria
function GalleryGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <GallerySkeleton key={i} />
      ))}
    </div>
  );
}

export { Skeleton, GallerySkeleton, GalleryGridSkeleton };
