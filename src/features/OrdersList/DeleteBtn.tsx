import { Button } from "@/components/ui/button";
import { useDeleteOrderMutation } from "@/services/api";
import { Loader, Trash2 } from "lucide-react";

type DeleteBtnProps = {
  orderId: string;
};

const DeleteBtn: React.FC<DeleteBtnProps> = ({ orderId }) => {
  const [mutation, { isLoading }] = useDeleteOrderMutation();

  return (
    <Button
      onClick={() => mutation({ orderId })}
      variant="ghost"
      className="hover:bg-red-600 group"
    >
      {isLoading ? (
        <Loader className="h-4 w-4 animate-spin duration-[infinity]" />
      ) : (
        <Trash2 size={16} className="group-hover:text-white" />
      )}
    </Button>
  );
};
export { DeleteBtn };
