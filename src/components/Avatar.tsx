import {
  Avatar as AvatarComp,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function Avatar({
  src,
  fallbackText,
  alt,
}: {
  src?: string;
  fallbackText: string;
  alt?: string;
}) {
  return (
    <AvatarComp>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </AvatarComp>
  );
}
