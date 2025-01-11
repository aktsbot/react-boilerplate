import PageTitle from "@/components/page-title";

import ChangePassword from "./widgets/change-password";
import ChangeUserInfo from "./widgets/change-user-info";

export const AccountPage = () => {
  return (
    <>
      <PageTitle title="Account" />
      <h1 className="text-4xl font-bold">Account</h1>

      <div className="mt-4 lg:flex gap-2">
        <ChangeUserInfo />
        <div className="mt-2"></div>
        <ChangePassword />
      </div>
    </>
  );
};

export default AccountPage;
