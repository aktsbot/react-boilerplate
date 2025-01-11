import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router";

import {
  ForgotPasswordSchema,
  TForgotPasswordSchema,
} from "@/lib/schemas/auth";

import Loading from "@/components/loading";
import PageTitle from "@/components/page-title";
import { InputText } from "@/components/inputs";
import { logger } from "@/utils";
import { api_forgotpassword } from "@/api/auth";

import useAuthStore from "@/store/auth";
import useGeneralStore from "@/store/general";

export const ForgotPasswordPage = () => {
  const { isLoggedIn } = useAuthStore();
  const { addAlertMessage } = useGeneralStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: TForgotPasswordSchema) => {
    const payload = {
      ...data,
    };
    try {
      const { data: apiData } = await api_forgotpassword(payload);
      addAlertMessage({
        text: apiData.message,
        type: "info",
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
      <PageTitle title="Forgot password" />
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full sm:max-w-md">
          <h1 className="text-4xl font-bold">Forgot your password?</h1>
          <p className="mt-2 text-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>
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
            <div className="mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loading />}
                Get reset link
              </button>
              <p className="text-sm mt-1">
                <Link className="link link-primary" to="/login">
                  Back to login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
