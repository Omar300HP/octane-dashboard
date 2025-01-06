import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

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
    <div className="flex flex-row items-center justify-between md:justify-end md:gap-x-2 py-4 px-4">
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
        className="m-0"
      >
        <span className="invisible md:visible md:relative absolute">
          Previous
        </span>
        <ChevronLeft className="visible md:invisible md:absolute relative" />
      </Button>
      <div className="flex items-center gap-1 text-sm xs:text-xs">
        <div className="invisible md:visible md:relative absolute">Page</div>
        <strong>{`${pageIndex}/${pageCount}`}</strong>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={nextPage}
        disabled={isNextDisabled}
      >
        <span className="invisible md:visible md:relative absolute">Next</span>
        <ChevronRight className="visible md:invisible md:absolute relative" />
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
