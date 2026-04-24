import { UserRole } from "../enums";
import { LucideIcon } from "lucide-react";

export type SidebarMenuItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  badge?: string;
  roles?: UserRole[];
  subs?: SidebarMenuItem[];
};

export type SidebarMenuGroup = {
  title: string;
  roles?: UserRole[];
  menus?: SidebarMenuItem[];
};
