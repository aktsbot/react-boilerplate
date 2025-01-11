import PageTitle from "@/components/page-title";

export const ForgotPasswordPage = () => {
  return (
    <>
      <PageTitle title="Forgot password" />
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full sm:max-w-md">
          <h1 className="text-4xl font-bold">Forgot your password?</h1>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
