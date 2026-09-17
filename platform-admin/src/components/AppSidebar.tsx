import React from "react";
import PlatformLogo from "@/assets/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  BarChart3Icon,
  HandCoinsIcon,
  HeadsetIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  LogOut,
  MegaphoneIcon,
  NotebookTextIcon,
  SettingsIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  StoreIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logoutUser } from "@/store/auth/authSlice";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const SIDEBAR_NAV = [
    { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboardIcon },
    { href: "/dashboard/sellers", label: "Sellers", Icon: StoreIcon },
    {
      href: "/dashboard/commission-payouts",
      label: "Commissions & Payouts",
      Icon: HandCoinsIcon,
    },
    {
      href: "/dashboard/global-catalog",
      label: "Global Catalog",
      Icon: NotebookTextIcon,
    },
    {
      href: "/dashboard/delivery-network",
      label: "Delivery Network",
      Icon: TruckIcon,
    },
    { href: "/dashboard/customers", label: "Customers", Icon: UsersIcon },
    { href: "/dashboard/orders", label: "Orders", Icon: ShoppingBagIcon },
    { href: "/dashboard/support", label: "Support", Icon: HeadsetIcon },
    { href: "/dashboard/marketing", label: "Marketing", Icon: MegaphoneIcon },
    { href: "/dashboard/reports", label: "Reports", Icon: BarChart3Icon },
    {
      href: "/dashboard/users-permissions",
      label: "Users & Permissions",
      Icon: ShieldCheckIcon,
    },
    { href: "/dashboard/settings", label: "Settings", Icon: SettingsIcon },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  return (
    <Sidebar className="">
      <SidebarHeader className="">
        <SidebarMenu>
          <div className="flex items-center justify-center gap-3 p-2">
            <img
              src={PlatformLogo}
              alt="Platform Admin Logo"
              className="size-10 rounded-none shadow-none shadow-black/20"
            />
            <div className="flex flex-col gap-1 leading-none">
              <span className="text-[16px] font-medium text-white">
                Platform Admin
              </span>
              <span className="text-[14px] text-white">v.1.0.0</span>
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_NAV.map((item) => {
                const isActive = item.href === location.pathname;
                return (
                  <SidebarMenuItem key={item?.href}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.href)}
                      className={cn(
                        "text-accent hover:bg-white/25 hover:text-white h-12 cursor-pointer",
                        isActive && "bg-[#9FE870]/50 text-white",
                      )}
                    >
                      <item.Icon className="" />
                      {item.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 rounded-md bg-white/10 p-3">
          <Avatar className="size-10 shrink-0">
            <AvatarImage src={user?.profile_picture} />
            <AvatarFallback className="bg-[#9FE870]/50 text-accent font-medium text-[16px]">
              {user?.avatarName}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-medium text-accent">
              {user?.fullName}
            </div>
            <div className="truncate text-[14px] font-normal text-accent">
              {user?.email}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-accent shrink-0 rounded-sm p-1.5 hover:bg-white/50 hover:text-destructive cursor-pointer"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
