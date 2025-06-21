import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import ToggleThemeButton from "../ToggleThemeButton";
import routes from "@/constants/routes";
import { User } from "@/types";
import { LogOut } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface HeaderProps {
  user: User | null;
  handleLogout?: () => void;
  isComingSoonPage: boolean;
}

const NavigationLinks = memo(() => (
  <>
    {routes.slice(1, 4).map((route) => (
      <Link
        key={route.path}
        href={route.path}
        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        {route.name}
      </Link>
    ))}
  </>
));
NavigationLinks.displayName = "NavigationLinks";

const AuthButtons = memo(() => (
  <div className="flex items-center gap-2">
    {routes.slice(4).map((route) => (
      <Button
        key={route.path}
        variant={route.path === "/login" ? "default" : "outline"}
        size="sm"
        asChild
      >
        <Link href={route.path}>{route.name}</Link>
      </Button>
    ))}
  </div>
));
AuthButtons.displayName = "AuthButtons";

function Header({ user, handleLogout, isComingSoonPage }: HeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const userInitials = user?.name
    ? getInitials(user.name)
    : user?.email
    ? user.email[0].toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2 mr-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold hover:opacity-90 transition-opacity"
            aria-label="Go to homepage"
          >
            <Image
              src="/linkify.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
              aria-hidden="true"
            />
            <span className="sm:inline-block">Linkify</span>
          </Link>
        </div>

        {isComingSoonPage && (
          <p
            className="animate-bounce text-sm font-medium text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            Coming Soon!
          </p>
        )}

        <div className="flex-1" />

        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          <NavigationLinks />

          <div className="flex items-center gap-4">
            {!(user?.name || user?.email) ? (
              <AuthButtons />
            ) : (
              <div className="flex items-center gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.picture || ""}
                    alt={`${
                      user.name || user.email || "User"
                    }'s profile picture`}
                  />
                  <AvatarFallback aria-hidden="true">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 cursor-pointer"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            )}
            <ToggleThemeButton />
          </div>
        </nav>

        <div className="md:hidden">
          <ToggleThemeButton />
          <MobileNav
            user={user}
            handleLogout={handleLogout}
            isComingSoonPage={isComingSoonPage}
          />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
