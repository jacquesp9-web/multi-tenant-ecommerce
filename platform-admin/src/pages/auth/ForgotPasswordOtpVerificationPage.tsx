import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const ForgotPasswordOtpVerificationPage = () => {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;

  console.log("location", location);

  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOtp("");

      navigate("/auth/reset-password", {
        state: {
          email: email,
          resetToken: resetToken,
        },
      });
    }, 2000);
  };

  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  return (
    <div className="w-full max-w-sm">
      <Link
        to={"/auth/login"}
        aria-label="Back to Sign In"
        className="mb-4 inline-flex text-foreground items-center gap-1 text-[14px]"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <h2 className="text-2xl font-bold">OTP Verification Code</h2>
      <p className="mt-1.5 text-[14px] text-muted-foreground">
        {email ? (
          <>
            We've emailed a 6-digit OTP Verification Code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </>
        ) : (
          "We've emailed you a 6-digit OTP Verification Code"
        )}
      </p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          disabled={isSubmitting}
          className="w-full"
        >
          <InputOTPGroup className="w-full">
            <InputOTPSlot index={0} className="w-full h-10 text-lg" />
            <InputOTPSlot index={1} className="w-full h-10 text-lg" />
            <InputOTPSlot index={2} className="w-full h-10 text-lg" />
            <InputOTPSlot index={3} className="w-full h-10 text-lg" />
            <InputOTPSlot index={4} className="w-full h-10 text-lg" />
            <InputOTPSlot index={5} className="w-full h-10 text-lg" />
          </InputOTPGroup>
        </InputOTP>

        {error && <p className="mt-2 text-[14px] text-destructive">{error}</p>}

        <Button type="submit" className="mt-4 h-10 w-full cursor-pointer">
          {isSubmitting ? (
            <>
              <Spinner className="size-4" />
              Verifying OTP...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordOtpVerificationPage;
