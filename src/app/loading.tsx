import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-[32px]">
      {/* Shortener Form Skeleton */}
      <Card className="m-auto w-full gap-4 sm:gap-6">
        <CardHeader className="pb-0 sm:pb-3">
          <Skeleton className="h-8 w-48 mb-2" /> {/* Title */}
          <Skeleton className="h-4 w-72" /> {/* Description */}
        </CardHeader>
        <CardContent>
          <div className="flex space-y-2 md:space-y-0 flex-col md:flex-row">
            <div className="w-full">
              <Skeleton className="h-10 w-full" /> {/* URL Input */}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:ml-2">
              <Skeleton className="h-10 w-full" /> {/* Custom Link Input */}
              <Skeleton className="h-10 w-full" /> {/* Submit Button */}
            </div>
          </div>
          <div className="my-4 h-[1px] bg-border" /> {/* Separator */}
          {/* Feature List Skeleton */}
          <div className="w-full">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Skeleton */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <div className="p-4">
              <Skeleton className="h-8 w-[250px] mb-4" /> {/* Search Input */}
              <div className="border rounded-lg">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
                {/* Table Rows */}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 p-4 border-t">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-6 w-full" />
                    ))}
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between p-4">
                <Skeleton className="h-8 w-[100px]" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
