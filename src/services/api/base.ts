// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryFn } from "./config";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  baseQuery: baseQueryFn,
  endpoints: () => ({}),
  tagTypes: ["orders", "order", "users", "user"],
});
