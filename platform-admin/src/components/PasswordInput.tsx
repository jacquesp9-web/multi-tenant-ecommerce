import React, { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? "Hide Password" : "Show Password"}
        className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

export default PasswordInput;
