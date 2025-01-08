import PageTitle from "@/components/page-title";
import useAuthStore from "@/store/auth";

export const LoginPage = () => {
  const {
    // isLoggedIn,
    setTokensAndLogin,
  } = useAuthStore();

  const handleLogin = () => {
    setTokensAndLogin({
      accessToken: "ahaha",
      refreshToken: "hoooo",
      isLoggedIn: true,
    });
  };

  return (
    <>
      <PageTitle title="Login" />
      <h1>Login</h1>

      <button className="btn btn-primary" onClick={handleLogin}>
        Test login
      </button>
    </>
  );
};

export default LoginPage;
