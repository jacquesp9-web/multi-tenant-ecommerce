import type { loginResponse } from "@/api/auth";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/PasswordInput";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { getAxiosErrorMessage } from "@/lib/api.error";
import { fetchLogin, fetchMe } from "@/store/auth/authSlice";
import { ShieldCheckIcon, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);
    try {
      const response = (await dispatch(
        fetchLogin({
          email: email,
          password: password,
        }),
      ).unwrap()) as loginResponse;

      if (!response.accessToken || !response.refreshToken || !response.userType) {
        throw new Error("Invalid login response");
      }

      await dispatch(fetchMe()).unwrap();
      navigate("/dashboard");
    } catch (error) {
      setError(getAxiosErrorMessage(error, "User Account Failed to Login"));
    } finally {
      setIsSubmitting(false);
    }
  };
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold ">Sign In</h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">
        Access the Platform Admin console
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
              autoCapitalize="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="h-11 rounded-sm"
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password" className="text-[14px]">
                Password
              </FieldLabel>
              <Link
                to={"/auth/forgot-password"}
                className="text-[14px] font-medium text-primary hover:underline"
              >
                Forgot Your Password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              placeholder="enter your password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="h-11"
            />
          </Field>

          {error && (
            <p className="mt-0 flex items-center justify-center gap-2 bg-rose-100 border border-rose-500 p-2 rounded-sm text-center text-[14px] text-rose-700">
              <TriangleAlert size={16} />
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="mt-0 h-11 rounded-sm w-full cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </FieldGroup>
      </form>

      <div className="mt-4 flex items-center justify-center gap-1 text-[14px] text-muted-foreground">
        <ShieldCheckIcon size="16" />
        Protected by SSO and 2-Factor Authentication
      </div>
    </div>
  );
}
