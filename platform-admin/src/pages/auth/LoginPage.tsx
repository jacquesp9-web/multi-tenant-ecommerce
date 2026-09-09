import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPassword("");
      setEmail("");
    }, 2000);
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
              className="h-10"
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
            <Input
              id="password"
              type="password"
              placeholder="enter your password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="h-10"
            />
          </Field>

          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

          <Button type="submit" className="mt-0 h-10 w-full cursor-pointer">
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

      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <ShieldCheckIcon size="16" />
        Protected by SSO and 2-Factor Authentication
      </div>
    </div>
  );
}
