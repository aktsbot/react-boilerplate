import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import {
  ChangePasswordSchema,
  TChangePasswordSchema,
} from "@/lib/schemas/auth";

import { InputText } from "@/components/inputs";
import Loading from "@/components/loading";

import useGeneralStore from "@/store/general";
import { logger } from "@/utils";
import { api_changepassword } from "@/api/auth";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { addAlertMessage } = useGeneralStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: TChangePasswordSchema) => {
    const payload = {
      ...data,
    };
    try {
      const { data: apiData } = await api_changepassword(payload);
      addAlertMessage({
        text: apiData.message,
        type: "info",
      });
      reset();
      if (apiData.messageCode === "RE_LOGIN") {
        navigate("/logout");
        return;
      }
    } catch (error) {
      logger(error);
    }
  };

  return (
    <div className="card border border-neutral shadow-xl flex-1">
      <div className="card-body">
        <h2 className="card-title">Change password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <InputText
            type="password"
            label="Current password"
            placeholder="SuperSecret"
            fullWidth
            hookFormRegister={register("oldPassword")}
            error={errors.oldPassword?.message}
          />

          <InputText
            type="password"
            label="New password"
            placeholder="NewSuperSecret"
            fullWidth
            hookFormRegister={register("newPassword")}
            error={errors.newPassword?.message}
          />

          <div className="card-actions mt-2">
            <button
              className="btn btn-error btn-outline"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loading />}
              Update password
            </button>
          </div>
          <p className="text-xs mt-1">
            Note: Changing your password will log you out.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
