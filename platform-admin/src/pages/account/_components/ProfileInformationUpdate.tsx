import TitleHeading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { updateCurrentUser, type IUser } from "@/store/auth/authSlice";
import { CircleCheckBig, PenLineIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const ProfileInformationUpdate = ({ user }: { user: IUser }) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<IUser>({
    id: user?.id,
    email: user?.email,
    fullName: user?.fullName,
    phone: user?.phone,
    profile_picture: user?.profile_picture,
    avatarName: user?.avatarName,
  });

  const isLoading = useAppSelector((state) => state?.auth?.isLoading);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setData({
      id: user?.id,
      email: user?.email,
      fullName: user?.fullName,
      phone: user?.phone,
      profile_picture: user?.profile_picture,
      avatarName: user?.avatarName,
    });
  }, [user]);

  const handleChange = (e: any) => {
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
    const response: any = await dispatch(updateCurrentUser(data));

    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      setIsOpen(false);
    } else {
      toast.error(response?.payload?.message);
    }
  };

  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-11 px-3 cursor-pointer hover:bg-emerald-600 hover:text-white hover:rounded-full"
        >
          <PenLineIcon size={18} />
          Edit Your Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full lg:max-w-sm min-h-28 p-4 lg:p-6">
        <TitleHeading
          title="Edit Your Profile"
          classNameTitle="font-semibold text-[16px]"
          subTitle="Update Your Profile Account Information"
          classNameSubTitle="font-medium text-sm"
        />

        {/* user form */}
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          {/* user account profile picture */}

          {/* user account full name */}
          <div className="grid gap-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your Full Name"
              value={data?.fullName}
              name="fullName"
              disabled={isLoading}
              onChange={handleChange}
              required
            />
          </div>

          {/* user account email address */}
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="Enter your Email Address"
              value={data?.email}
              name="email"
              disabled={isLoading}
              onChange={handleChange}
              required
            />
          </div>

          {/* user account contact number */}
          <div className="grid gap-1.5">
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              id="phone"
              placeholder="Enter your Contct Number"
              value={data?.phone}
              name="phone"
              disabled={isLoading}
              onChange={handleChange}
              required
            />
          </div>

          {/* user account buttons */}
          <div className="mt-4">
            <Button className="flex gap-2 h-11 px-4 mx-auto cursor-pointer text-sm font-medium">
              {isLoading
                ? "Updating Account Profile...."
                : "Update Account Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileInformationUpdate;
