import { Select } from "@/components/Select";
import {
  useUpdateOrderMutation,
  type Order,
  type OrderStatus,
} from "@/services/api";

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

type StatusSelectProps = {
  status: OrderStatus;
  order: Order;
};
const StatusSelect: React.FC<StatusSelectProps> = ({ status, order }) => {
  const [mutation, { isLoading, data }] = useUpdateOrderMutation();

  return (
    <Select
      options={StatusOptions}
      value={data?.status || status}
      className="w-[100px] md:w-[180px]"
      isLoading={isLoading}
      onChange={(value) => {
        mutation({
          reqBody: { ...order, status: value as OrderStatus },
          params: { id: order.id },
        });
      }}
    />
  );
};
export { StatusSelect };
