import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface VaccinationTableActionsProps {
  status: "COMPLETED" | "UPCOMING" | "OVERDUE"
}

const VaccinationTableActions = ({ status }: VaccinationTableActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl hover:bg-[#F5F3FF]"
        >
          <MoreHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        <DropdownMenuItem className="cursor-pointer">
          <Eye className="size-4" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Pencil className="size-4" />
          Edit Record
        </DropdownMenuItem>

        {status !== "COMPLETED" && (
          <DropdownMenuItem className="cursor-pointer">
            Record Vaccination
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
          <Trash2 className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default VaccinationTableActions
