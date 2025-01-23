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

export const Navigation = () => {
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
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link to="/albums">Albums</Link>
          </NavigationMenuLink>
          <NavigationMenuLink>
            <Logout />
          </NavigationMenuLink>
          <NavigationMenuLink>
            <ToggleTheme />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
