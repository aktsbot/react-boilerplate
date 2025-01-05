import { Link } from "react-router";
import PageTitle from "../components/page-title";

export const SignupPage = () => {
  return (
    <>
      <PageTitle title="Sign Up" />

      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full sm:max-w-md">
          <h1 className="text-4xl font-bold">Sign Up</h1>

          <form className="mt-2">
            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">What is your name?</span>
              </div>
              <input
                type="text"
                placeholder="Jack Sparrow"
                className="input input-bordered w-full max-w-sm"
              />
            </label>

            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Email address</span>
              </div>
              <input
                type="email"
                placeholder="jack@blackpearl.com"
                className="input input-bordered w-full max-w-sm"
              />
            </label>

            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Confirm email address</span>
              </div>
              <input
                type="email"
                placeholder="jack@blackpearl.com"
                className="input input-bordered w-full max-w-sm"
              />
            </label>

            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Super secret password"
                className="input input-bordered w-full max-w-sm"
              />
            </label>

            <div className="mt-4">
              <button className="btn btn-primary" type="submit">
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
