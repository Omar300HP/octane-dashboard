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
import { UserForm } from "./Form";

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
              <UserForm initialValues={data} />
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
