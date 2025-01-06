import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { routes } from "@/routes/paths";
import { useGetOrderByIdQuery } from "@/services/api";
import { formatDate, formatToCurrency } from "@/utils";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DataDisplay: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-row w-full justify-between items-center  gap-x-5">
      <div className="font-bold text-gray-800">{label + ":"}</div>
      <div className="text-gray-600">{value}</div>
    </div>
  );
};

const OrderModal: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.orderId ?? "";

  const { data, isLoading } = useGetOrderByIdQuery(
    { orderId },
    {
      skip: !params.orderId,
    }
  );

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          navigate(routes.orders``);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Order #${orderId}`}</DialogTitle>
          <DialogDescription className="flex justify-center items-center">
            {!isLoading && data ? (
              <div className="flex flex-col  items-center justify-center">
                <DataDisplay label="Order Status" value={data.status} />
                <DataDisplay label="Customer Name" value={data.customerName} />
                <DataDisplay
                  label="Total Amount"
                  value={
                    data.totalAmount ? formatToCurrency(data.totalAmount) : ""
                  }
                />
                <DataDisplay
                  label="Date"
                  value={new Date(formatDate(data.date)).toLocaleDateString()}
                />
              </div>
            ) : (
              <Loader className="h-10 w-10 animate-spin duration-[infinity]" />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export { OrderModal };
