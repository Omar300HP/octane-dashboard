import { Button } from "@/components/ui/button";
import { useDeleteOrderMutation } from "@/services/api";
import { Loader, Trash2 } from "lucide-react";

type DeleteBtnProps = {
  orderId: string;
  isLastRow: boolean;
  isLastPage: boolean;
  previousPage: () => void;
  lastPage: number;
};

const DeleteBtn: React.FC<DeleteBtnProps> = ({
  orderId,
  isLastRow,
  isLastPage,
  previousPage,
}) => {
  const [mutation, { isLoading }] = useDeleteOrderMutation();

  return (
    <Button
      onClick={async () => {
        try {
          const shouldBack = isLastRow && isLastPage;
          mutation({ orderId }).unwrap();

          if (shouldBack) {
            previousPage();
          }

          // eslint-disable-next-line no-empty
        } catch {}
      }}
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
