import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipDemo({
  children,
  hovertext = "Add to library",
}: {
  children: React.ReactNode;
  hovertext?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{hovertext}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
