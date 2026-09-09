import AuthLayouts from "@/layouts/AuthLayouts";
import ForgotPasswordOtpVerificationPage from "@/pages/auth/ForgotPasswordOtpVerificationPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import { Route, Routes } from "react-router";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export default function Routers() {
  return (
    <Routes>
      {/* Auth Section */}
      <Route path="auth" element={<AuthLayouts />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="forgot-password/otp"
          element={<ForgotPasswordOtpVerificationPage />}
        />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Dahsboard */}
    </Routes>
  );
}
