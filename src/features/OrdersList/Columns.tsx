import type { ColumnDef } from "@tanstack/react-table";
import type { Order, OrderStatus } from "@/services/api";
import { formatDate, formatToCurrency } from "@/utils";
import { Select } from "@/components/Select";

const StatusOptions: { value: OrderStatus; label: OrderStatus }[] = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Shipped",
    label: "Shipped",
  },
  {
    value: "Delivered",
    label: "Delivered",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
  },
];

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
      const status = row.getValue("status") as string | undefined;
      return (
        <Select
          options={StatusOptions}
          value={status}
          className="w-[100px] md:w-[180px]"
        />
      );
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
