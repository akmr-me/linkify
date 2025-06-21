import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-[200px] mx-auto mb-4" />
          <Skeleton className="h-6 w-[300px] mx-auto" />
        </div>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Skeleton className="h-8 w-[150px] mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-[90%]" />
          </CardContent>
        </Card>

        {/* Two Column Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* What We Offer */}
          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-[150px] mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-[90%]" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-[150px] mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-[90%]" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-8 w-[150px] mb-4" />
            <Skeleton className="h-4 w-[80%]" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
