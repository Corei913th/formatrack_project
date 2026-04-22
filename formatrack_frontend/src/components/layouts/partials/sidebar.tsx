import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { MENU_GROUPS } from "@/contents/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Brand } from "@/components/brand";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { SidebarMenuItem as SidebarMenuItemType } from "@/types/ui/sidebar-menu-item.type";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();



  const isLinkActive = React.useCallback(
    (menu: SidebarMenuItemType) => {
      console.log(location.pathname, menu.url);
      return (
        menu.url &&
        (location.pathname === menu.url ||
          (menu.url !== "/" && location.pathname.startsWith(menu.url)))
      );
    },
    [location.pathname]
  );

  const isGroupActive = React.useCallback(
    (menu: SidebarMenuItemType) => {
      console.log(location.pathname, menu.url);
      return menu.subs?.some((sub) => isLinkActive(sub));
    },
    [location.pathname, isLinkActive]
  );

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Brand
              className="justify-start px-3 h-12"
              brandClassNames="text-3xl"
            />
          </SidebarMenuItem>
        </SidebarMenu>

        {/* <SearchForm className="mt-3" /> */}
      </SidebarHeader>

      <SidebarContent>
        {MENU_GROUPS.map((group) =>
          <SidebarGroup key={group.title}>
            {group.title && (
              <SidebarGroupLabel className="uppercase text-muted-foreground/60">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {group.menus?.map((menu: SidebarMenuItemType) =>
                  !menu.subs || menu.subs?.length == 0 ? (
                    menu.url && (
                      <SidebarMenuItem key={menu.title}>
                        <SidebarMenuButton
                          asChild
                          data-active={isLinkActive(menu)}
                          className="group/menu-button font-medium gap-3 h-9 rounded-md [&>svg]:size-auto data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:bg-primary/90"
                        >
                          <Link to={menu.url}>
                            {menu.icon && (
                              <menu.icon className="text-primary group-hover/menu-button:text-primary-foreground group-data-[active=true]/menu-button:text-primary-foreground size-5!" />
                            )}
                            <span>{menu.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  ) : (
                    <Collapsible
                      defaultOpen={isGroupActive(menu)}
                      key={menu.title}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger
                          data-active={isGroupActive(menu)}
                          className="group/menu-button font-medium gap-3 h-9 rounded-md [&>svg]:size-auto cursor-pointer data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:bg-primary/90"
                          asChild
                        >
                          <SidebarMenuButton tooltip={menu.title}>
                            {menu.icon && (
                              <menu.icon className="text-muted-foreground/60 group-hover/menu-button:text-primary-foreground group-data-[active=true]/menu-button:text-primary-foreground size-5!" />
                            )}
                            <span>{menu.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 size-5!" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {menu.subs?.map(
                              (subItem: SidebarMenuItemType) =>
                                subItem.url && (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                      data-active={isLinkActive(subItem)}
                                      className="font-medium gap-3 h-9 rounded-md hover:bg-primary/20 [&>svg]:size-auto data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-semibold"
                                      asChild
                                    >
                                      <Link to={subItem.url}>
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
