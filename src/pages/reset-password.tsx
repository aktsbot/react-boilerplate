import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import { ResetPasswordSchema, TResetPasswordSchema } from "@/lib/schemas/auth";

import Loading from "@/components/loading";
import PageTitle from "@/components/page-title";
import { InputText } from "@/components/inputs";
import { logger } from "@/utils";
import { api_resetpassword } from "@/api/auth";

import useAuthStore from "@/store/auth";
import useGeneralStore from "@/store/general";

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAuthStore();
  const { addAlertMessage } = useGeneralStore();
  const navigate = useNavigate();

  const userId = searchParams.get("userId") || "";
  const resetCode = searchParams.get("resetCode") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      userId,
      resetCode,
      password: "",
    },
  });

  const onSubmit = async (data: TResetPasswordSchema) => {
    const payload = {
      ...data,
    };
    try {
      const { data: apiData } = await api_resetpassword(payload);
      addAlertMessage({
        text: apiData.message,
        type: "info",
      });
      reset();
      navigate("/login");
    } catch (error) {
      logger(error);
    }
  };

  if (!userId || !resetCode) {
    return <Navigate to="/" />;
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageTitle title="Reset password" />
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full sm:max-w-md">
          <h1 className="text-4xl font-bold">Reset password</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            {/* email */}
            <InputText
              type="password"
              label="New password"
              placeholder="NewSuperSecret"
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
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
