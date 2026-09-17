import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");

      navigate("/auth/forgot-password/otp", {
        state: {
          email: email,
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

      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <p className="mt-1.5 text-[14px] text-muted-foreground">
        We'll email you a 6-digit code to your Email Address
      </p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email" className="text-[14px]">
              Email Address
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="enter your email address"
              autoComplete="username"
              className="h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </Field>

          {error && (
            <p className="mt-2 text-[14px] text-destructive">{error}</p>
          )}

          <Button type="submit" className="mt-0 h-10 w-full cursor-pointer">
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};
