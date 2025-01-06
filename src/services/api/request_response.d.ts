export type GetOrderListReqParams = {
  page: number;
  limit: number;
};

export type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  totalAmount: number;
};

export type GetOrderListRes = {
  orders: Order[];
  total: number;
};

export type CreateOrderReq = {
  customerName: string;
  totalAmount: number;
};

export type CreateOrderRes = Order;

export type GetOrderReqParams = {
  orderId: string;
};

export type GetOrderRes = Order;

export type DeleteOrderReqParams = {
  orderId: string;
};

export type DeleteOrderRes = void;

export type UpdateOrderReqParams = {
  id: string;
};

export type UpdateOrderReqBody = Order;

export type UpdateOrderRes = Order;
