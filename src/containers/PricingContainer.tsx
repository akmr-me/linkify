"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import plans from "@/constants/plans";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

export default function PricingContainer() {
  const user = useStore((state) => state.user);

  const isButtonDisabled = (planTitle: string): boolean => {
    if (
      ["Free", "Signed In"].includes(planTitle) &&
      (user?.email || user?.name)
    )
      return true;
    if (user?.isPro) return true;
    return false;
  };
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground text-lg">
            Select the perfect plan for your link management needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.title}
              className={cn([
                "flex flex-col",
                ...(plan.title === "Pro"
                  ? [
                      "md:col-span-full md:justify-self-center md:w-[400px] lg:col-span-1 lg:w-full lg:justify-self-auto",
                    ]
                  : []),
              ])}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CircleCheckBig className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full cursor-pointer"
                  variant={plan.title === "Pro" ? "default" : "outline"}
                  disabled={isButtonDisabled(plan.title)}
                >
                  <Link href={plan.redirect}>
                    {plan.title === "Free" ? "Get Started" : "Upgrade Now"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
