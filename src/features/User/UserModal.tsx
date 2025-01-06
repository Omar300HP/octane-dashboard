import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { routes } from "@/routes/paths";
import { useGetUserByIdQuery } from "@/services/api";
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

const UserModal: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId ?? "";

  const { data, isLoading } = useGetUserByIdQuery(
    { userId },
    {
      skip: !params.userId,
    }
  );

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          navigate(routes.users``);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`User #${userId}`}</DialogTitle>
          <DialogDescription className="flex justify-center items-center">
            {!isLoading && data ? (
              <div className="flex flex-col  items-center justify-center">
                <DataDisplay label="Username" value={data.username} />
                <DataDisplay label="Email" value={data.email} />
                <DataDisplay label="Role" value={data.role} />
                <DataDisplay
                  label="Active"
                  value={data.isActive ? "Yes" : "No"}
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
export { UserModal };
