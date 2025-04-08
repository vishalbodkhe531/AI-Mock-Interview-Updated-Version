"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col mt-10 shadow-2xl my-7 border-r-2 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 text-center border p-5 md:p-7 rounded-lg border-gray-200 dark:border-gray-700">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl flex flex-col justify-center items-center text-center"
          >
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        ))}
      </div>

      <div className="flex justify-end my-4 gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-24 w-full rounded-md" />
    </div>
  );
}
