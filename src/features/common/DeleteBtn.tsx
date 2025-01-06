import { Button } from "@/components/ui/button";
import { useDeleteOrderMutation, useDeleteUserMutation } from "@/services/api";
import { Loader, Trash2 } from "lucide-react";

type DeleteBtnProps = {
  id: string;
  isLastRow: boolean;
  isLastPage: boolean;
  previousPage: () => void;
  lastPage: number;
  useMutation: typeof useDeleteOrderMutation | typeof useDeleteUserMutation;
};

const DeleteBtn: React.FC<DeleteBtnProps> = ({
  id,
  isLastRow,
  isLastPage,
  previousPage,
  useMutation,
}) => {
  const [mutation, { isLoading }] = useMutation();

  return (
    <Button
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
          const shouldBack = isLastRow && isLastPage;
          mutation({ id }).unwrap();

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
