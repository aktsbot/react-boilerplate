import { Outlet } from "react-router";

import Navbar from "./navbar";
import AppAlertMessages from "./app-alert-messages";

export const PageLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
      <AppAlertMessages />
    </>
  );
};

export default PageLayout;
