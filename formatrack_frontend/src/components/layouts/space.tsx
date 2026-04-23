import { Outlet } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/partials/sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE } from "@/constants/layout.constant";
import { AppHeader } from "./partials/Header";

export const SpaceLayout = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <SidebarProvider
      defaultOpen={isDesktop}
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="bg-white dark:bg-background">
        <AppHeader />
        <main className="flex flex-1 flex-col p-4 lg:gap-2 lg:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
