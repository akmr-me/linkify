import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturesLoading() {
  // Create an array of 6 items for feature cards
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-[300px] mx-auto mb-4" />
        <Skeleton className="h-6 w-[400px] mx-auto" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {skeletonCards.map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-12 w-12 rounded-full mb-4" />{" "}
              {/* For icon */}
              <Skeleton className="h-6 w-[150px] mb-2" /> {/* For title */}
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" /> {/* For first line */}
              <Skeleton className="h-4 w-[85%] mt-2" /> {/* For second line */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
