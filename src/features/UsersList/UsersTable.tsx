import { DataTable } from "@/components/DataTable";
import { useGetUserListQuery } from "@/services/api";
import { columns } from "./Columns";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/paths";
import { Loader } from "lucide-react";

const UsersTable = () => {
  const { data, isLoading } = useGetUserListQuery({
    limit: 100,
    page: 0,
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="w-[80%] h-[360px] grid place-items-center">
        <Loader className="h-10 w-10 animate-spin duration-[infinity]" />
      </div>
    );
  }

  return (
    <DataTable
      onRowClick={(id) => {
        navigate(routes.userPage`${id}`);
      }}
      columns={columns}
      data={data?.users ?? []}
      rowKey={"id"}
    />
  );
};

export { UsersTable };
