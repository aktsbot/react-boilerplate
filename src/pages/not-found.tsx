import { Link } from "react-router";

import PageTitle from "@/components/page-title";

export const NotFoundPage = () => {
  return (
    <>
      <PageTitle title="Page not found" />
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-full sm:max-w-md mt-6">
          <h1 className="text-4xl font-bold">That's a 404</h1>
          <p className="pt-2">We can't find what you were looking for.</p>
          <p>
            Go to the{" "}
            <Link to="/" className="link link-primary">
              homepage
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
