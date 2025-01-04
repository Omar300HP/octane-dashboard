import { appConfig } from "@/config";
import { axiosBaseQuery } from "@/lib/axios";
// import type * as ApiCallTypes from "./request_response";

export const baseQueryFn = axiosBaseQuery({
  baseUrl: appConfig.baseUrl,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum RequestMethods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
  PATCH = "patch",
}

export const queryDefinitions = {
  // getOrdersList: (_params: ApiCallTypes.GetOrderListReqParams) => ({
  //   url: appConfig.restApiPaths.orders.list``,
  //   method: RequestMethods.GET,
  // }),
  // createOrder: (
  //   reqBody: ApiCallTypes.CreateOrderReq,
  //   params: ApiCallTypes.CreateOrderParams
  // ) => ({
  //   url: appConfig.restApiPaths.orders.create`${params.workspaceId}}`,
  //   method: RequestMethods.POST,
  //   data: reqBody,
  // }),
  // getOrderById: (params: ApiCallTypes.GetOrderReqParams) => ({
  //   url: appConfig.restApiPaths.orders
  //     .getById`${params.workspaceId}${params.OrderId}`,
  //   method: RequestMethods.GET,
  // }),
  // deleteOrder: (params: ApiCallTypes.DeleteOrderReqParams) => ({
  //   url: appConfig.restApiPaths.orders
  //     .delete`${params.workspaceId}${params.OrderId}`,
  //   method: RequestMethods.DELETE,
  // }),
} as const;
