import { UsersTable } from "@/features/UsersList";
import { Outlet } from "react-router-dom";

const Users = () => {
  return (
    <div className="w-full  flex flex-col justify-center items-center px-1 md:px-16">
      <UsersTable />
      <Outlet />
    </div>
  );
};
export default Users;
