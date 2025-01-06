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
  id: string;
};

export type DeleteOrderRes = void;

export type UpdateOrderReqParams = {
  id: string;
};

export type UpdateOrderReqBody = Order;

export type UpdateOrderRes = Order;

export type Role = "Admin" | "User" | "Guest";

export type User = {
  id: string;
  username: string;
  email: string;
  role: Role;
  isActive: boolean;
};

export type GetUsersListReqParams = {
  page: number;
  limit: number;
};

export type GetUsersListRes = {
  users: User[];
  total: number;
};

export type CreateUserReq = {
  username: string;
  email: string;
  role: Role;
};

export type CreateUserRes = User;

export type GetUserReqParams = {
  userId: string;
};

export type GetUserRes = User;

export type DeleteUserReqParams = {
  id: string;
};

export type DeleteUserRes = void;

export type UpdateUserReqParams = {
  id: string;
};

export type UpdateUserReqBody = User;

export type UpdateUserRes = User;
