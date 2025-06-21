"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import FeatureList from "../features/List";
import { ShortnerProps } from "@/types";

export default function Shortner({
  handleShortenLink,
  formState: { url, alias },
  handleInputChange,
}: ShortnerProps) {
  return (
    <Card className="m-auto w-full gap-4 sm:gap-6">
      <CardHeader className="pb-0 sm:pb-3">
        <CardTitle>Linkify your long URL</CardTitle>
        <CardDescription>
          In the form of a short URL, or a QR code, or both.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-y-2 md:space-y-0 flex-col md:flex-row">
          {/* URL Input - Full width on all screens */}
          <div className="w-full">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={url}
              onChange={handleInputChange}
              placeholder="Paste your long URL here"
              className="w-full"
              name="url"
            />
          </div>

          {/* Custom Link and Button - Split into two columns on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:ml-2">
            <Input
              id="alias"
              value={alias}
              onChange={handleInputChange}
              placeholder="Custom link"
              name="alias"
            />
            <Button
              className="w-full md:w-auto cursor-pointer"
              onClick={handleShortenLink}
              disabled={!url}
            >
              Linkify for free!
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <FeatureList />
      </CardContent>
    </Card>
  );
}
