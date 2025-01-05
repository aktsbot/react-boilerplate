import { useEffect } from "react";

export const PageTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    // TODO: get app name from env
    const baseTitle = "myapp";
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [title]);

  return null;
};

export default PageTitle;
