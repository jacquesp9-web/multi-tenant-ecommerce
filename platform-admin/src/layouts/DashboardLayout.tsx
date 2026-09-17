import AppSidebar from "@/components/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/use-store";
import { SearchIcon, UserIcon } from "lucide-react";
import { Link, Outlet } from "react-router";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const DashboardLayout = () => {
  const user = useAppSelector((state) => state?.auth?.user);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="bg-accent/50">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 my-auto"
            />

            {/* search */}
            <div className="relative flex w-full max-w-xs lg:max-w-sm h-10 items-center">
              <SearchIcon size={18} className="absolute ml-2 text-primary" />
              <Input
                className="w-full h-full pl-8"
                placeholder="Search Stores, Orders, Agents....."
              />
            </div>

            {/* user account information */}
            <div className="ml-auto flex items-center gap-2 rounded-md bg-white/10 p-3">
              <Popover>
                <PopoverTrigger>
                  <Avatar className="size-10 shrink-0 cursor-pointer">
                    <AvatarImage src={user?.profile_picture} />
                    <AvatarFallback className="bg-[#9FE870]/50 text-slate-700 font-medium text-[16px]">
                      {user?.avatarName}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="min-h-25">
                  <Link
                    to={"/dashboard/my-account"}
                    className="flex items-center gap-2"
                  >
                    <UserIcon size={18} />
                    My Account Profile
                  </Link>
                </PopoverContent>
              </Popover>
            </div>
          </header>
          <div className="p-4 lg:p-6 min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] container mx-auto">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
