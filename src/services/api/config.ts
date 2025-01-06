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
    url: appConfig.restApiPaths.orders.delete`${params.id}`,
    method: RequestMethods.DELETE,
  }),
  updateOrder: (reqBody: ApiCallTypes.UpdateOrderReqBody) => ({
    url: appConfig.restApiPaths.orders.update`${reqBody.id}`,
    method: RequestMethods.PUT,
    data: reqBody,
  }),

  getUsersList: (params: ApiCallTypes.GetUsersListReqParams) => ({
    url: appConfig.restApiPaths.users.list`${String(params.limit)}${String(
      params.page
    )}`,
    method: RequestMethods.GET,
  }),

  createUser: (reqBody: ApiCallTypes.CreateUserReq) => ({
    url: appConfig.restApiPaths.users.create``,
    method: RequestMethods.POST,
    data: reqBody,
  }),

  getUserById: (params: { userId: string }) => ({
    url: appConfig.restApiPaths.users.getById`${params.userId}`,
    method: RequestMethods.GET,
  }),

  deleteUser: (params: { id: string }) => ({
    url: appConfig.restApiPaths.users.delete`${params.id}`,
    method: RequestMethods.DELETE,
  }),

  updateUser: (reqBody: ApiCallTypes.User) => ({
    url: appConfig.restApiPaths.users.update`${reqBody.id}`,
    method: RequestMethods.PUT,
    data: reqBody,
  }),
} as const;
