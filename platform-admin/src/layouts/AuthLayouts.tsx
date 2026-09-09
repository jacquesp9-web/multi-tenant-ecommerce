import { Outlet } from "react-router";
import PlatformLogo from "@/assets/logo.svg";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export default function AuthLayouts() {
  return (
    <div className="flex min-h-svh">
      {/* left side */}
      <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-[#062518] to-[#10543A] p-12 lg:w-110 xl:w-125">
        <div className="flex items-center gap-3">
          <img
            src={PlatformLogo}
            alt="Platform Admin Logo"
            className="size-12 rounded-xl shadow-lg shadow-black/20"
          />
          <span className="text-base font-bold text-white">Platform Admin</span>
        </div>

        <div className="">
          <h1 className="max-w-95 text-2xl leading-snug font-bold text-white">
            Run Every Store On Your Marketplace From One Place
          </h1>
          <p className="mt-4 max-w-90 text-[14px] leading-5 text-[#C7DCCB]">
            Tenants, Catelogs, Commissions, Delivery Network and Reporting -
            unified across everyy store on the Platform.
          </p>
        </div>

        <p className="text-[14px] text-[#8FB093]">
          &copy; 2026 JacPot Consulting(Pty) Ltd
        </p>
      </div>

      {/* right side */}
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <Outlet />
      </div>
    </div>
  );
}
