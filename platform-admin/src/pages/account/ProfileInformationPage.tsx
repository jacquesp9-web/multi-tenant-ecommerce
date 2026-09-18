import React from "react";
import TitleHeading from "@/components/Heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/use-store";
import { Label } from "@/components/ui/label";
import ProfileInformationUpdate from "./_components/ProfileInformationUpdate";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Laptop2Icon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ChangePassword from "./_components/ChangePassword";
import TwoFactorAuthenticaton from "./_components/TwoFactorAuthenticaton";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const ProfileInformationPage = () => {
  const user = useAppSelector((state) => state?.auth?.user);

  return (
    <div>
      <TitleHeading
        title="My Account"
        subTitle="Your Profile, Password, Two-factor Authentication, and where your are currently Signed In"
      />

      <div className="space-y-6 mt-4 lg:mt-6">
        {/* User Account and User Account Role Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
          {/* user account profile */}
          <div className="col-span-1 lg:col-span-1 h-full">
            <Card className="p-4 lg:p-6 h-full border border-slate-50 hover:shadow-xl">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="size-16 shrink-0">
                    <AvatarImage src={user?.profile_picture} />
                    <AvatarFallback className="bg-[#9FE870]/50 text-muted-foreground font-medium text-[16px]">
                      {user?.avatarName}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-[16px] truncate">
                      {user?.fullName}
                    </div>
                    <div className="bg-primary/20 px-3 py-0.5 text-primary font-medium text-sm rounded-full items-center justify-center mt-0.5">
                      {user?.userType}
                    </div>
                  </div>
                </div>
                <div>{user && <ProfileInformationUpdate user={user} />}</div>
              </div>
              <div className="grid gap-4">
                <div className="border-b"></div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Account Email Address</Label>
                  <div>{user?.email}</div>
                </div>
                <div className="border-b"></div>
                <div className="flex items-center justify-between">
                  <Label className="etxt-sm">Account Contact Number</Label>
                  <div>{user?.phone}</div>
                </div>
                <div className="border-b"></div>
              </div>
            </Card>
          </div>

          {/* user account roles */}
          <div className="h-full ">
            <Card className="p-4 lg:p-6 h-full  border border-slate-50 hover:shadow-xl">
              <div className="flex items-center gap-1">
                <UserIcon size={20} />
                <TitleHeading
                  title="User Account Roles & Access"
                  classNameTitle="font-medium text-[16px]"
                  classNameSubTitle=""
                />
              </div>

              <div className="grid gap-4">
                <div className="border-b"></div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Current Role</Label>
                  <Badge className="text-sm">
                    {user?.role?.name ?? "Administrator"}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Full Access to every Module, Store, Catalog, Orders, Payouts,
                Delivery Network and Platform Settings
              </p>

              <Button variant="link" className="cursor-pointer">
                View Permission Matrix <ArrowRight size={16} />
              </Button>
            </Card>
          </div>
        </div>

        {/* User Account Password & Security Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
          {/* user account password & security */}
          <div className="col-span-1 lg:col-span-1 h-full">
            <Card className="p-4 lg:p-6 h-full  border border-slate-50 hover:shadow-xl">
              <div className="flex items-center gap-1">
                <ShieldCheckIcon size={20} />
                <TitleHeading
                  title="User Account Password & Security"
                  classNameTitle="font-medium text-[16px]"
                  classNameSubTitle=""
                />
              </div>

              <div className="border-b"></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <Label className="text-sm">Password</Label>
                  <div>Last Changed 2 Months Ago</div>
                </div>
                <div>
                  <ChangePassword />
                </div>
              </div>

              <div className="border-b"></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <Label className="text-sm">Two-Factor Authentication</Label>
                  <div>Extra code required during the Login Process</div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="text-sm">Enabled</Badge>
                  <TwoFactorAuthenticaton user={user} />
                </div>
              </div>
            </Card>
          </div>

          {/* user account active sessions */}
          <div className="col-span-1 lg:col-span-1 h-full">
            <Card className="p-4 lg:p-6 h-full  border border-slate-50 hover:shadow-xl">
              <div className="flex items-center gap-1">
                <Laptop2Icon size={20} />
                <TitleHeading
                  title="User Account Sessions"
                  classNameTitle="font-medium text-[16px]"
                  classNameSubTitle=""
                />
              </div>

              <div className="border-b"></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <Label className="text-sm">Password</Label>
                  <div>Last Changed 2 Months Ago</div>
                </div>
                <div>
                  <ChangePassword />
                </div>
              </div>

              <div className="border-b"></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <Label className="text-sm">Two-factor Authentication</Label>
                  <div>Extra code required at Account Login</div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="text-sm">Enabled</Badge>
                  <TwoFactorAuthenticaton user={user} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformationPage;
