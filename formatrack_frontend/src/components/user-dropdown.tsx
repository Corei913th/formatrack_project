import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { generateAbbreviation } from "@/utils/common";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/contexts/authContext";


export default function UserDropdown() {
  const { user, logout } = useAuthContext();
  const navigation = useNavigate();

  const handleLogout = async () => {
    logout();
    navigation("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
        >
          <div className="flex items-center gap-2 px-1.5 py-1">
            <Avatar className="size-8">
              <AvatarFallback>
                {generateAbbreviation(user?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex max-w-32 flex-col text-left">
              <span className="truncate text-sm font-medium text-accent-foreground">
                {user?.first_name}
              </span>
              <span className="truncate text-xs font-normal text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-(--radix-dropdown-menu-trigger-width)"
        align="end"
      >
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {user?.first_name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings aria-hidden="true" />
            <span>Mise a jour du profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut aria-hidden="true" />
          <span>Deconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
