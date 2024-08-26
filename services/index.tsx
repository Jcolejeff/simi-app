import axios from "axios";
import { authDetailsInterface } from "types";
export const checkIfLocalStorageExists = () => {
   if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("store") || "{}");
   }
   return "{}";
};

export const baseURL: string | undefined = process.env.APP_API_URL || "https://api.timbu.cloud";

const ORGANIZATION_ID = process.env.APP_ORGANIZATION_ID || "0500f1aa41fe4332bba7f9ed36d7b141";
const store = checkIfLocalStorageExists();
const token = store?.state?.authDetails?.access_token || "";

// Todo: Remove this and use env variables
const axiosInstanceNew = axios.create({
   baseURL: "https://api.timbu.cloud",

   params: {
      Appid: "G7AXG5PQ2TDCKY9",
      Apikey: "87fede5c15a042188ad9d55208e2ac4a20240201130549376229",
      organization_id: "0500f1aa41fe4332bba7f9ed36d7b141",
      size: 50,
      page: 1,
   },
});

// api no auth
export const ApiNoAuth = axios.create({
   baseURL,
   withCredentials: true,
   params: {
      Appid: process.env.APP_API_ID || "",
      Apikey: process.env.APP_API_KEY || "",
   },
});

ApiNoAuth.interceptors.request.use(
   (config) => {
      return { ...config, withCredentials: true };
   },
   (error) => {
      return Promise.reject(error);
   },
);

ApiNoAuth.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {
      return Promise.reject(error);
   },
);

export default axiosInstanceNew;
