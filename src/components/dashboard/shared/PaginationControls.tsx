import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t px-6 py-4">
      <p className="text-sm text-[#78716C]">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(page - 1)}
          className="rounded-xl"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({
            length: totalPages,
          }).map((_, index) => {
            const pageNumber = index + 1;

            return (
              <Button
                key={pageNumber}
                size="icon"
                variant={page === pageNumber ? "default" : "outline"}
                onClick={() => onPageChange(pageNumber)}
                className={`size-9 rounded-xl ${
                  page === pageNumber
                    ? "bg-[#7C3AED] hover:bg-[#6D28D9]"
                    : ""
                }`}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          className="rounded-xl"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;