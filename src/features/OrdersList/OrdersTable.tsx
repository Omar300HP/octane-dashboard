import { DataTable } from "@/components/DataTable";
import { useGetOrderListQuery } from "@/services/api";
import { columns } from "./Columns";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/paths";

const OrdersTable = () => {
  const { data } = useGetOrderListQuery({
    limit: 100,
    page: 0,
  });

  const navigate = useNavigate();

  return (
    <DataTable
      onRowClick={(id) => {
        navigate(routes.orderPage`${id}`);
      }}
      columns={columns}
      data={data?.orders ?? []}
      rowKey={"id"}
    />
  );
};

export { OrdersTable };
