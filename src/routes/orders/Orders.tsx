import { OrdersTable } from "@/features/OrdersList";
import { Outlet } from "react-router-dom";

const Orders = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-1 md:px-16">
      <OrdersTable />
      <Outlet />
    </div>
  );
};

export default Orders;
