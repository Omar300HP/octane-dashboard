import type { ColumnDef } from "@tanstack/react-table";
import type { Order, OrderStatus } from "@/services/api";
import { formatDate, formatToCurrency } from "@/utils";
import { StatusSelect } from "./StatusSelect";

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
];
