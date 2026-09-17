import AuthLayouts from "@/layouts/AuthLayouts";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ForgotPasswordOtpVerificationPage from "@/pages/auth/ForgotPasswordOtpVerificationPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import { Route, Routes } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import SellersPage from "@/pages/dashboard/sellers/SellersPage";
import CommissionPayoutsPage from "@/pages/dashboard/commission-payouts/CommissionPayoutsPage";
import GlobalCatalogPage from "@/pages/dashboard/global-catalog/GlobalCatalogPage";
import DeliveryNetworkPage from "@/pages/dashboard/delivery-network/DeliveryNetworkPage";
import CustomersPage from "@/pages/dashboard/customers/CustomersPage";
import OrdersPage from "@/pages/dashboard/orders/OrdersPage";
import SupportPage from "@/pages/dashboard/support/SupportPage";
import MarketingPage from "@/pages/dashboard/marketing/MarketingPage";
import ReportsPage from "@/pages/dashboard/reports/ReportsPage";
import UsersPermissionsPage from "@/pages/dashboard/users-permissions/UsersPermissionsPage";
import SettingsPage from "@/pages/dashboard/settings/SettingsPage";
import ProfileInformationPage from "@/pages/account/ProfileInformationPage";
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

      {/* Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="sellers" element={<SellersPage />} />
          <Route path="sellers" element={<SellersPage />} />
          <Route
            path="commission-payouts"
            element={<CommissionPayoutsPage />}
          />
          <Route path="global-catalog" element={<GlobalCatalogPage />} />
          <Route path="delivery-network" element={<DeliveryNetworkPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="marketing" element={<MarketingPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users-permissions" element={<UsersPermissionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="my-account" element={<ProfileInformationPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
