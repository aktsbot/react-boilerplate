import http from "./http";

export const api_uploadFile = (formData: FormData) => {
  return http.post(`/upload`, formData);
};
