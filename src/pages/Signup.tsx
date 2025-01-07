import { Link } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageTitle from "../components/page-title";
import { SignupSchema, TSignupSchema } from "../lib/schemas/Signup";

export const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data: TSignupSchema) => {
    console.log(data);
  };

  return (
    <>
      <PageTitle title="Sign Up" />

      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full sm:max-w-md">
          <h1 className="text-4xl font-bold">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            {/* name */}
            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text text-error">
                  What is your name?
                </span>
              </div>
              <input
                type="text"
                placeholder="Jack Sparrow"
                className="input input-bordered w-full max-w-sm input-error"
                {...register("fullName")}
              />
            </label>
            {true && <p className="text-error">Yo!</p>}
            {/* email */}
            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Email address</span>
              </div>
              <input
                type="email"
                placeholder="jack@blackpearl.com"
                className="input input-bordered w-full max-w-sm"
                {...register("email")}
              />
            </label>
            {/* password */}
            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Super secret password"
                className="input input-bordered w-full max-w-sm"
                {...register("password")}
              />
            </label>
            {/* confirm password */}
            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Confirm password</span>
              </div>
              <input
                type="password"
                placeholder="That password again"
                className="input input-bordered w-full max-w-sm"
                {...register("confirmPassword")}
              />
            </label>

            <div className="mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
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
