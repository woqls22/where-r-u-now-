import axios from "axios";
import { rootURL } from "./Constants";
export const headers = {
  "Content-Type": "application/json",
};
export const SpringAxios = axios.create({
  baseURL: `${rootURL}`,
});
SpringAxios.interceptors.request.use(function (config) {
  return { ...config, headers: headers };
});
