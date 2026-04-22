import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/mode-toggle";
import UserDropdown from "@/components/user-dropdown";
import { useLayoutContext } from "@/providers/layoutProvider";
import { cn } from "@/utils/common";

export function AppHeader() {
  const { breadcrumb } = useLayoutContext();

  return (
    <header className="flex sticky top-0 border-b h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ms-1" />

        <div className="max-lg:hidden lg:contents">
          <Separator orientation="vertical" className="me-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <>
                  <BreadcrumbItem key={item.title} className={cn(!item.isActive && "hidden md:block")}>
                    {item.isActive ? (
                      <BreadcrumbPage className="font-semibold">{item.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumb.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" key={`separator-${index}`} />
                  )}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
