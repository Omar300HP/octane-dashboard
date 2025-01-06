import type { ColumnDef } from "@tanstack/react-table";
import type { Order, OrderStatus } from "@/services/api";
import { formatDate, formatToCurrency } from "@/utils";
import { StatusSelect } from "@/features/common";
import { DeleteBtn } from "./DeleteBtn";

export const columns: ColumnDef<Order>[] = [
  {
    header: "Order ID",
    accessorKey: "id",
  },
  {
    header: "Customer Name",
    accessorKey: "customerName",
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }) => formatDate(row.getValue("date")),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = (row.getValue("status") || "Pending") as OrderStatus;
      const order = row.original;
      return <StatusSelect status={status} order={order} />;
    },
  },
  {
    header: "Total Amount",
    accessorKey: "totalAmount",
    cell: ({ row }) => {
      const totalAmount = row.getValue("totalAmount") as number | undefined;
      return totalAmount ? formatToCurrency(totalAmount) : "";
    },
  },
  {
    header: "",
    accessorKey: "id",
    cell: ({ row, table }) => {
      const orderId = row.getValue("id") as string;
      const isLastRow =
        row.index === table.getRowCount() - 1 &&
        table.getRowModel().rows.length === 1;
      const isLastPage =
        table.getPageCount() === table.getState().pagination.pageIndex + 1;

      return (
        <DeleteBtn
          orderId={orderId}
          isLastRow={isLastRow}
          isLastPage={isLastPage}
          previousPage={table.previousPage}
          lastPage={table.getPageCount()}
        />
      );
    },
  },
];
