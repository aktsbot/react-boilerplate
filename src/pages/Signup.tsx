import { Link } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageTitle from "@/components/page-title";
import { InputText } from "@/components/inputs";
import Loading from "@/components/loading";

import { SignupSchema, TSignupSchema } from "@/lib/schemas/Signup";
import { api_signup } from "@/api/auth";

export const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: TSignupSchema) => {
    const payload = {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    };
    await api_signup(payload);
    reset();
  };

  return (
    <>
      <PageTitle title="Sign Up" />

      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full sm:max-w-md">
          <h1 className="text-4xl font-bold">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            {/* name */}
            <InputText
              type="text"
              label="What is your name?"
              placeholder="Jack Sparrow"
              fullWidth
              hookFormRegister={register("fullName")}
              error={errors.fullName?.message}
            />

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

            {/* confirm password */}
            <InputText
              type="password"
              label="Cofirm password"
              placeholder="SuperSecret"
              fullWidth
              hookFormRegister={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <div className="mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loading />}
                Create account
              </button>
              <p className="text-sm mt-1">
                Already have an account?{" "}
                <Link className="link link-primary" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
