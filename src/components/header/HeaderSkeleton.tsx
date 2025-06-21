import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2 mr-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" /> {/* Logo */}
            <Skeleton className="h-6 w-24 hidden sm:block" /> {/* Brand name */}
          </div>
        </div>

        <div className="flex-1" />

        <nav className="hidden md:flex items-center gap-6">
          {/* Navigation Links */}
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-16" />
          ))}

          <div className="flex items-center gap-4">
            {/* Auth/User Section */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20" /> {/* Login/Register Button */}
              <Skeleton className="h-9 w-20" /> {/* Secondary Button */}
            </div>
            <Skeleton className="h-9 w-9 rounded-md" /> {/* Theme Toggle */}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </header>
  );
}
