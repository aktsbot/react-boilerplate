import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import {
  ChangeUserInfoSchema,
  TChangeUserInfoSchema,
} from "@/lib/schemas/account";

import { InputText } from "@/components/inputs";
import Loading from "@/components/loading";

import useAuthStore from "@/store/auth";
import useGeneralStore from "@/store/general";
import { logger } from "@/utils";

import { api_changeUserInfo } from "@/api/user";

export const ChangeUserInfo = () => {
  const navigate = useNavigate();
  const { addAlertMessage } = useGeneralStore();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TChangeUserInfoSchema>({
    resolver: zodResolver(ChangeUserInfoSchema),
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
    },
  });

  const onSubmit = async (data: TChangeUserInfoSchema) => {
    const payload = {
      ...data,
    };
    try {
      const { data: apiData } = await api_changeUserInfo(payload);
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
    <div className="card bg-neutral text-neutral-content shadow-xl flex-1">
      <div className="card-body">
        <h2 className="card-title">Change info</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <InputText
            type="text"
            label="Your name"
            placeholder="Jack Sparrow"
            fullWidth
            hookFormRegister={register("fullName")}
            error={errors.fullName?.message}
          />

          <InputText
            type="email"
            label="Email"
            placeholder="jack@flyingdutchman.com"
            fullWidth
            hookFormRegister={register("email")}
            error={errors.email?.message}
          />

          <div className="card-actions mt-2">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loading />}
              Update info
            </button>
          </div>
          <p className="text-xs mt-1">
            Note: Changing your email will log you out.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserInfo;
