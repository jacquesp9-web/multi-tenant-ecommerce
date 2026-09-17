import { Outlet, useNavigate } from "react-router";
import PlatformLogo from "@/assets/logo.svg";
import { useAppSelector } from "@/hooks/use-store";
import { useEffect } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export default function AuthLayouts() {
  const user = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) {
      navigate("/dashboard");
    }
  }, [user]);

  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  return (
    <div className="flex min-h-svh p-4">
      {/* left side */}
      <div className="hidden lg:flex flex-col rounded-2xl justify-between bg-linear-to-br from-[#062518] to-[#10543A] p-10 lg:w-110 xl:w-125">
        <div className="flex items-center justify-center gap-3">
          <img
            src={PlatformLogo}
            alt="Platform Admin Logo"
            className="size-16 rounded-sm shadow-lg shadow-black/20"
          />
          <span className="text-4xl font-bold text-white">Platform Admin</span>
        </div>

        <div className="">
          <h1 className="max-w-100 text-2xl leading-snug font-bold text-white text-center">
            Run Every Store On Your Marketplace From One Place
          </h1>
          <p className="mt-4 max-w-100 text-[14px] leading-5 text-[#C7DCCB] text-center">
            Tenants, Catelogs, Commissions, Delivery Network and Reporting -
            unified across every Store on the Platform.
          </p>
        </div>

        <p className="text-[14px] text-[#8FB093] text-center">
          &copy; 2026 JacPot Consulting(Pty) Ltd
        </p>
      </div>

      {/* right side */}
      <div className="flex flex-1 items-center justify-center bg-background p-10">
        <Outlet />
      </div>
    </div>
  );
}
