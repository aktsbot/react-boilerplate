import { config } from "./config";

export const logger = (data: any) => {
  if (config.buildMode === "development") {
    console.log(data);
  }
  return;
};
