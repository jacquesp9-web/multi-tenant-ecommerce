import React, { useState } from "react";
import TitleHeading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { IUser } from "@/store/auth/authSlice";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const TwoFactorAuthenticaton = ({ user }: { user: Partial<IUser> }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-11 cursor-pointer">
          Enabled
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full lg:max-w-sm min-h-28 p-4 lg:p-6">
        <TitleHeading
          title="Two-Factor Authentication"
          classNameTitle="font-semibold text-[16px]"
          subTitle="Enable Your Two-Factor Authentication"
          classNameSubTitle="font-medium text-sm"
        />
        {/* user account two-factor authentication form */}
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          {/* email address */}
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              disabled
              value={user?.email}
              placeholder="Enter you Email Address"
            />
          </div>

          {/* user account two-factor authenrication button */}
          <div className="mt-0">
            <div className="mt-4">
              <Button className="flex gap-2 h-11 px-4 mx-auto cursor-pointer text-sm font-medium">
                {isLoading
                  ? "Sending Two-Factor Authentication OTP...."
                  : "Send Two-Factor Authentication OTP"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorAuthenticaton;
