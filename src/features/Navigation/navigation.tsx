import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import { Logout } from "@/features/Logout/logout.tsx";
import { ToggleTheme } from "@/features/ThemeSelector/toggle-theme.tsx";

import { useAuthStore } from "@/store/auth.ts";

export const Navigation = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link to="/">Login</Link>
          </NavigationMenuLink>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link to="/dashboard">Dashboard</Link>
          </NavigationMenuLink>
          <NavigationMenuLink>
            <Logout />
          </NavigationMenuLink>
          <NavigationMenuLink>
            {isAuthenticated ? <ToggleTheme /> : null}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
