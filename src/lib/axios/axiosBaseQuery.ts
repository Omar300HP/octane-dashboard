import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";
import type { SerializedError } from "@reduxjs/toolkit";

type BaseQueryFnParams = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    BaseQueryFnParams,
    unknown,
    SerializedError | undefined | { code: number | undefined; message: unknown }
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: { ...(headers || {}) },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          code: err.response?.status,
          message:
            (err.response?.data as AxiosError<{ message: string }>)?.message ||
            (typeof err.response?.data === "string"
              ? err.response?.data
              : err.message),
        },
      };
    }
  };
