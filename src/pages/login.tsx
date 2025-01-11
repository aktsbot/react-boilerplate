import { Link, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageTitle from "@/components/page-title";
import { InputText } from "@/components/inputs";
import Loading from "@/components/loading";

import { LoginSchema, TLoginSchema } from "@/lib/schemas/login";
import { api_login } from "@/api/auth";
import { logger } from "@/utils";

import useAuthStore from "@/store/auth";

export const LoginPage = () => {
  const { isLoggedIn, setTokenAndLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    const payload = {
      ...data,
    };
    try {
      const { data: apiData } = await api_login(payload);
      // Note: the refresh token is set in cookie by the Set-Cookie header
      // Check the response from axios for the header.
      setTokenAndLogin({
        accessToken: apiData.accessToken,
        isLoggedIn: true,
      });
      reset();
    } catch (error) {
      logger(error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageTitle title="Login" />

      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full sm:max-w-md">
          <h1 className="text-4xl font-bold">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            {/* email */}
            <InputText
              type="email"
              label="Email address"
              placeholder="jack@blackpearl.com"
              fullWidth
              hookFormRegister={register("email")}
              error={errors.email?.message}
            />

            {/* password */}
            <InputText
              type="password"
              label="Password"
              placeholder="SuperSecret"
              fullWidth
              hookFormRegister={register("password")}
              error={errors.password?.message}
            />

            <div className="mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loading />}
                Login
              </button>
              <p className="text-sm mt-1">
                <Link className="link link-primary" to="/forgot-password">
                  Forgot password?
                </Link>
              </p>
              <p className="text-sm mt-4">
                Don't have an account?{" "}
                <Link className="link link-primary" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
