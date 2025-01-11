import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import PageLayout from "@/components/page-layout";
import Loading from "@/components/loading";
import RequireAuth from "@/components/require-auth";
import AppInit from "@/components/app-init";

import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";
const LoginPage = lazy(() => import("@/pages/login"));
const ForgotPasswordPage = lazy(() => import("@/pages/forgot-password"));
const ResetPasswordPage = lazy(() => import("@/pages/reset-password"));
const LogoutPage = lazy(() => import("@/pages/logout"));
const SignupPage = lazy(() => import("@/pages/signup"));
const AboutPage = lazy(() => import("@/pages/about"));
const AccountPage = lazy(() => import("@/pages/account"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading routeLoader />}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="about" element={<AboutPage />} />

            {/* protected */}
            <Route
              path="account"
              element={
                <RequireAuth>
                  <AccountPage />
                </RequireAuth>
              }
            />
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

function App() {
  return (
    <>
      <AppInit />
      <AppRouter />
    </>
  );
}

export default App;
