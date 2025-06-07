import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg p-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16 mb-4" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="bg-card rounded-lg p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CertificateListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-card rounded-lg p-6 border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Skeleton className="h-3 w-12 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div>
              <Skeleton className="h-3 w-16 mb-1" />
              <Skeleton className="h-4 w-8" />
            </div>
            <div>
              <Skeleton className="h-3 w-14 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="h-3 w-10 mb-1" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}