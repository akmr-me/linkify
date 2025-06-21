import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  //   DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  //   DropdownMenuSub,
  //   DropdownMenuSubContent,
  //   DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeaderProps } from ".";
import { Avatar } from "../Avatar";
import routes from "@/constants/routes";
import Link from "next/link";
import { LogOut } from "lucide-react";

export function MobileNav({ user, handleLogout }: HeaderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <Avatar
            src={user?.picture}
            fallbackText={(user?.name || user?.email || "G")[0].toUpperCase()}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {user?.name && <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>}
        <DropdownMenuItem>{user?.email || "Guest User"}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {routes.slice(1, 4).map((route) => (
            <Link
              href={route.path}
              className="text-sm font-medium"
              key={route.path}
            >
              <DropdownMenuItem className="cursor-pointer">
                {route.name}
              </DropdownMenuItem>
            </Link>
          ))}{" "}
          {!(user?.name || user?.email) ? (
            routes.slice(4).map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="text-sm font-medium"
              >
                <DropdownMenuItem key={route.path} className="cursor-pointer">
                  {route.name}
                </DropdownMenuItem>
              </Link>
            ))
          ) : (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Log out
                <DropdownMenuShortcut>
                  <LogOut size={16} color="red" fontWeight="bold" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
