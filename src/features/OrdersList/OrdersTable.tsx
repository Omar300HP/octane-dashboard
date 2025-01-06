import { DataTable } from "@/components/DataTable";
import { useGetOrderListQuery } from "@/services/api";
import { columns } from "./Columns";

const OrdersTable = () => {
  const { data } = useGetOrderListQuery({
    limit: 100,
    page: 0,
  });

  return (
    <div className="w-full flex flex-col justify-center items-center px-1 md:px-16">
      <DataTable columns={columns} data={data?.orders ?? []} rowKey={"id"} />
    </div>
  );
};

export { OrdersTable };
