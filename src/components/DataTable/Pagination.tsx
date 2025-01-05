import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type PaginationProps = {
  setPageIndex: (index: number) => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  previousPage: () => void;
  nextPage: () => void;
  pageCount: number;
  pageIndex: number;
};

const Pagination: React.FC<PaginationProps> = ({
  setPageIndex,
  isPreviousDisabled,
  isNextDisabled,
  previousPage,
  nextPage,
  pageCount,
  pageIndex,
}) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4 mr-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPageIndex(0)}
        disabled={isPreviousDisabled}
        aria-label="first page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={previousPage}
        disabled={isPreviousDisabled}
      >
        Previous
      </Button>
      <div className="flex items-center gap-1">
        <div>Page</div>
        <strong>{`${pageIndex} of ${pageCount}`}</strong>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={nextPage}
        disabled={isNextDisabled}
      >
        Next
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={isNextDisabled}
        aria-label="last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { Pagination };
