import { CircleCheckBig } from "lucide-react";

export default function FeatureList() {
  return (
    <div className="w-full">
      <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-sm md:text-base">
        <li className="flex items-center gap-2">
          <CircleCheckBig className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
          <span className="text-muted-foreground">
            Linkify quickly and easily
          </span>
        </li>
        <li className="flex items-center gap-2">
          <CircleCheckBig className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
          <span className="text-muted-foreground">
            Customizable short links
          </span>
        </li>
        <li className="flex items-center gap-2">
          <CircleCheckBig className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
          <span className="text-muted-foreground">Generate QR codes</span>
        </li>
        <li className="flex items-center gap-2">
          <CircleCheckBig className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
          <span className="text-muted-foreground">
            Peek to secure redirection
          </span>
        </li>
      </ul>
    </div>
  );
}
