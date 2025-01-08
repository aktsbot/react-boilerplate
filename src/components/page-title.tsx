import { useEffect } from "react";

import { config } from "@/config";

const baseTitle = config.appTitle;

export const PageTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [title]);

  return null;
};

export default PageTitle;
