import axios from "axios";
import { handleHttpError } from "@/features/GlobalErrorHandler/utils";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async function (config) {
  return Promise.resolve(config);
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    handleHttpError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
