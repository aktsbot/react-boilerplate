import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import PageLayout from "@/components/page-layout";
import Loading from "@/components/loading";
import RequireAuth from "@/components/require-auth";
import AppInit from "@/components/app-init";

import HomePage from "@/pages/Home";
const LoginPage = lazy(() => import("@/pages/Login"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPassword"));
const LogoutPage = lazy(() => import("@/pages/Logout"));
const SignupPage = lazy(() => import("@/pages/Signup"));
const AboutPage = lazy(() => import("@/pages/About"));
const AccountPage = lazy(() => import("@/pages/Account"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading routeLoader />}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
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
