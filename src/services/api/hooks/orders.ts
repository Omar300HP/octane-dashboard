import { queryDefinitions } from "@/services/api/config";
import { baseApi } from "../base";
import {
  CreateOrderRes,
  GetOrderListReqParams,
  GetOrderListRes,
  CreateOrderReq,
  GetOrderRes,
  GetOrderReqParams,
  DeleteOrderReqParams,
  DeleteOrderRes,
} from "../request_response";

export const orderExtendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderList: builder.query<GetOrderListRes, GetOrderListReqParams>({
      query: (params: GetOrderListReqParams) =>
        queryDefinitions.getOrdersList(params),
      providesTags: (_, error) => (error ? [] : [{ type: "orders" }]),
    }),

    createOrder: builder.mutation<CreateOrderRes, { reqBody: CreateOrderReq }>({
      query: ({ reqBody }: { reqBody: CreateOrderReq }) =>
        queryDefinitions.createOrder(reqBody),

      invalidatesTags: (_, error) => (error ? [] : ["orders"]),
    }),

    getOrderById: builder.query<GetOrderRes, GetOrderReqParams>({
      query: (params: GetOrderReqParams) =>
        queryDefinitions.getOrderById(params),
      providesTags: (_, error, { orderId }) =>
        error ? [] : [{ type: "order", id: orderId }],
    }),

    deleteOrder: builder.mutation<DeleteOrderRes, DeleteOrderReqParams>({
      query: (params: DeleteOrderReqParams) =>
        queryDefinitions.deleteOrder(params),

      invalidatesTags: (_, error) => (error ? [] : [{ type: "orders" }]),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetOrderListQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
} = orderExtendedApi;
