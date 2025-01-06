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
  UpdateOrderRes,
  UpdateOrderReqBody,
  UpdateOrderReqParams,
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

      async onQueryStarted({ orderId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            orderExtendedApi.util.updateQueryData(
              "getOrderList",
              { page: 0, limit: 100 },
              (draft: GetOrderListRes) => {
                const orderIndex = draft.orders.findIndex(
                  (order) => order.id === orderId
                );

                if (orderIndex >= 0) {
                  Object.assign(
                    draft.orders,
                    draft.orders.splice(orderIndex, 1)
                  );
                }
              }
            )
          );
        } catch (error) {
          console.error("Failed to delete order:", error);
        }
      },
    }),

    updateOrder: builder.mutation<
      UpdateOrderRes,
      { reqBody: UpdateOrderReqBody; params: UpdateOrderReqParams }
    >({
      query: ({ reqBody }: { reqBody: UpdateOrderReqBody }) =>
        queryDefinitions.updateOrder(reqBody),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedOrder } = await queryFulfilled;
          dispatch(
            orderExtendedApi.util.updateQueryData(
              "getOrderList",
              { page: 0, limit: 100 },
              (draft: GetOrderListRes) => {
                const orderIndex = draft.orders.findIndex(
                  (order) => order.id === updatedOrder.id
                );
                if (orderIndex >= 0) {
                  Object.assign(draft.orders[orderIndex], updatedOrder);
                }
              }
            )
          );
        } catch (error) {
          console.error("Failed to update order:", error);
        }
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetOrderListQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderExtendedApi;
