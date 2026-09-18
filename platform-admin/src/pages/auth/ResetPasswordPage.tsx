import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { CheckCircle2, ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export default function ResetPasswordPage() {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const state = location.state as {
    email?: string;
    resetToken?: string;
  } | null;

  const email = state?.email;
  const resetToken = state?.resetToken;

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const misMatch = confirmPassword.length > 0 && password !== confirmPassword;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (misMatch) return;
    // if (!resetToken) {
    //   setError("Something Went Wrong");
    // }

    setIsSubmitting(true);
    // try {
    setTimeout(() => {
      setPassword("");
      setConfirmPassword("");
      setIsDone(true);
      setIsSubmitting(false);
    }, 2000);
    // } catch (err) {
    // setError(typeof err === "string" ? err : "Could Not Reset Password");
    // } finally {

    // }
  };

  if (isDone) {
    return (
      <div className="w-full max-w-sm flex flex-col justify-center items-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 size={40} className="text-primary" />
        </div>
        <h1 className="mt-2 text-2xl font-bold">Password Update</h1>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          Your Password has been reset Successfully. You can now Sign In with
          the New Password
        </p>
        <Button className="mt-2 h-10 w-full">
          <Link to={"/auth/login"}>Back to Sign In</Link>
        </Button>
      </div>
    );
  }
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold ">Reset Your Password</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {email ? (
          <>
            New Password for{" "}
            <span className="font-medium text-foreground">{email}</span>
          </>
        ) : (
          "Choose A New Password for your Account"
        )}
      </p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password" className="text-sm">
              New Password
            </FieldLabel>
            <PasswordInput
              id="password"
              placeholder="enter your new password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="h-10"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password" className="text-sm">
              Confirm Password
            </FieldLabel>
            <PasswordInput
              id="confirm-password"
              placeholder="confirm your new password"
              autoComplete="confirm-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
              className="h-10"
            />

            {misMatch && (
              <FieldError className="mt-4 text-center text-sm font-medium bg-rose-600 p-1 rounded text-white">
                New Password & Confirm Password does not Match
              </FieldError>
            )}
          </Field>

          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

          <Button type="submit" className="mt-0 h-10 w-full cursor-pointer">
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                Resetting Your Password...
              </>
            ) : (
              "Reset Your Password"
            )}
          </Button>
        </FieldGroup>
      </form>

      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <ShieldCheckIcon size="16" />
        Protected by SSO and 2-Factor Authentication
      </div>
    </div>
  );
}
