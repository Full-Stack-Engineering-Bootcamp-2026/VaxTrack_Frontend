import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PaginationControlsProps {
  currentPage: number

  totalPages: number

  hasNextPage: boolean

  hasPreviousPage: boolean

  onPageChange: (page: number) => void
}

const PaginationControls = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationControlsProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[#78716C]">
        Page <span className="font-semibold text-[#1C1917]">{currentPage}</span>{" "}
        of <span className="font-semibold text-[#1C1917]">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-xl"
        >
          <ChevronLeft className="mr-1 size-4" />
          Previous
        </Button>

        <Button
          size="sm"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]"
        >
          Next
          <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  )
}

export default PaginationControls
