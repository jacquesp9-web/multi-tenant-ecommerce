import React, { useState } from "react";
import TitleHeading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PasswordInput from "@/components/PasswordInput";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { changePassword, logoutUser } from "@/store/auth/authSlice";
import { toast } from "sonner";
import { UserLockIcon } from "lucide-react";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const ChangePassword = () => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error(
        "New Password & Confirm Password does not match. Please check",
      );
      return;
    }
    setIsLoading(true);
    const response: any = await dispatch(changePassword(data));

    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      setIsOpen(false);
      await dispatch(logoutUser());
    } else {
      toast.error(response?.payload?.message);
    }
    setIsLoading(false);
  };

  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-11 px-3 cursor-pointer hover:bg-emerald-600 hover:text-white hover:rounded-full text-sm font-medium"
        >
          <UserLockIcon size={18} />
          Change Your Password
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full lg:max-w-sm min-h-28 p-4 lg:p-6">
        <TitleHeading
          title="Change Account Password"
          classNameTitle="font-semibold text-[16px]"
          subTitle="Update Your Profile Account Password"
          classNameSubTitle="font-medium text-sm"
        />

        {/* user account change password form */}
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          {/* user account new password field */}
          <div className="grid gap-1.5">
            <Label htmlFor="password">New Password</Label>
            <PasswordInput
              id="password"
              placeholder="Enter New Password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          {/* user account confirm password field */}
          <div className="grid gap-1.5">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleOnChange}
              required
            />
          </div>

          {/* user account password change buttons */}
          <div className="mt-0">
            <div className="mt-4">
              <Button className="flex gap-2 h-11 px-4 mx-auto cursor-pointer text-sm font-medium">
                {isLoading
                  ? "Changing Account Password...."
                  : "Change Account Password"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
