import type { ColumnDef } from "@tanstack/react-table";
import { type User, useDeleteUserMutation } from "@/services/api";
import { DeleteBtn } from "@/features/common";
import { ActivitySwitch } from "./ActivitySwitch";

export const columns: ColumnDef<User>[] = [
  {
    header: "User ID",
    accessorKey: "id",
  },
  {
    header: "Username",
    accessorKey: "username",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },

  {
    header: "",
    accessorKey: "isActive",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      const user = row.original;
      return <ActivitySwitch isActive={isActive} user={user} />;
    },
  },

  {
    header: "",
    accessorKey: "id",
    cell: ({ row, table }) => {
      const id = row.getValue("id") as string;
      const isLastRow =
        row.index === table.getRowCount() - 1 &&
        table.getRowModel().rows.length === 1;
      const isLastPage =
        table.getPageCount() === table.getState().pagination.pageIndex + 1;

      return (
        <DeleteBtn
          id={id}
          isLastRow={isLastRow}
          isLastPage={isLastPage}
          previousPage={table.previousPage}
          lastPage={table.getPageCount()}
          useMutation={useDeleteUserMutation}
        />
      );
    },
  },
];
