import { appConfig } from "@/config";
import { axiosBaseQuery } from "@/lib/axios";
import type * as ApiCallTypes from "./request_response";

export const baseQueryFn = axiosBaseQuery({
  baseUrl: appConfig.baseUrl,
});

enum RequestMethods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
  PATCH = "patch",
}

export const queryDefinitions = {
  getOrdersList: (params: ApiCallTypes.GetOrderListReqParams) => ({
    url: appConfig.restApiPaths.orders.list`${String(params.limit)}${String(
      params.page
    )}`,
    method: RequestMethods.GET,
  }),
  createOrder: (reqBody: ApiCallTypes.CreateOrderReq) => ({
    url: appConfig.restApiPaths.orders.create``,
    method: RequestMethods.POST,
    data: reqBody,
  }),
  getOrderById: (params: ApiCallTypes.GetOrderReqParams) => ({
    url: appConfig.restApiPaths.orders.getById`${params.orderId}`,
    method: RequestMethods.GET,
  }),
  deleteOrder: (params: ApiCallTypes.DeleteOrderReqParams) => ({
    url: appConfig.restApiPaths.orders.delete`${params.orderId}`,
    method: RequestMethods.DELETE,
  }),
} as const;
