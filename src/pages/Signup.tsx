import PageTitle from "../components/page-title";

export const SignupPage = () => {
  return (
    <>
      <PageTitle title="Sign Up" />

      <div className="flex flex-col h-full items-center justify-center">
        <h1 className="text-4xl font-bold">Sign Up</h1>

        <form className="mt-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is your name?</span>
            </div>
            <input
              type="text"
              placeholder="Jack Sparrow"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email address</span>
            </div>
            <input
              type="email"
              placeholder="jack@blackpearl.com"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Confirm email address</span>
            </div>
            <input
              type="email"
              placeholder="jack@blackpearl.com"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Super secret password"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <div className="mt-4">
            <button className="btn btn-primary" type="submit">
              Create account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
