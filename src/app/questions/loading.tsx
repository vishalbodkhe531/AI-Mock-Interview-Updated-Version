// question/loading.tsx

"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen px-6 md:px-20 py-12 bg-background text-foreground">
      {/* Heading Skeleton */}
      <Skeleton className="h-10 w-48 mb-10" />

      {/* Cards Skeleton */}
      <div className="grid gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-border bg-muted/40 rounded-xl p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <Skeleton className="h-8 w-20 rounded" />
            </div>

            <Skeleton className="h-[1px] w-full" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
