import React from "react";
import TitleHeading from "@/components/Heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/use-store";
import { Label } from "@/components/ui/label";
import ProfileInformationUpdate from "./_components/ProfileInformationUpdate";
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

      <div className="space-y-4 space-x-4 mt-4 lg:mt-6">
        {/* User Account and User Account Role Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="col-span-1 lg:col-span-2">
            <Card className="p-4 lg:p-6">
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
                <div>
                  {user && <ProfileInformationUpdate user={user} />}
                </div>
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
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-4 lg:p-6"></Card>
          </div>
        </div>

        {/* User Account Password & Security Information */}

        {/* User Account Active Session Information */}
      </div>
    </div>
  );
};

export default ProfileInformationPage;
