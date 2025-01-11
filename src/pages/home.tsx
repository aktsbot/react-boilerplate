import { Link } from "react-router";
import PageTitle from "@/components/page-title";
import { TUser } from "@/lib/types";

import useAuthStore from "@/store/auth";

const UserHome = ({ user }: { user: TUser }) => {
  return (
    <p>
      Hello {user.fullName}. Check out your{" "}
      <Link to="/account" className="link link-primary">
        account page
      </Link>
      .
    </p>
  );
};

const DefaultHome = () => {
  return (
    <p>
      <Link to="/account">Please login</Link>.
    </p>
  );
};

export const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <>
      <PageTitle title="Home" />
      <h1 className="text-4xl font-bold">Home</h1>

      <div className="mt-4">
        {user ? <UserHome user={user} /> : <DefaultHome />}
      </div>
    </>
  );
};

export default HomePage;
