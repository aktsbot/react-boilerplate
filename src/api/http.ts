import axios from "axios";

const http = axios.create({
  // we expect the frontend and backend to be one the same domain
  // by doing this, we can use the browser's ability to set and get
  // cookies
  // withCredentials ensures cookies set, will be send as well.
  // we do this, so that xss scripts cant access the tokens.
  withCredentials: true, // needed for cookies to be set
  baseURL: "/api",
});

export default http;
