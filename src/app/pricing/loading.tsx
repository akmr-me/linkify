import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPricing() {
  // Create an array of 3 items for our pricing cards
  const skeletonCards = Array.from({ length: 3 });

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-[200px] mx-auto mb-4" />
        <Skeleton className="h-6 w-[300px] mx-auto" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {skeletonCards.map((_, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <Skeleton className="h-8 w-[120px] mb-2" />
              <Skeleton className="h-4 w-[180px]" />
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <Skeleton className="h-8 w-[100px]" />
              </div>
              <div className="space-y-3">
                {/* Create 5 skeleton lines for features */}
                {Array.from({ length: 5 }).map((_, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
