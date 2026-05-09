import { Search, SlidersHorizontal } from "lucide-react"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface VaccinationFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
}

const VaccinationFilterBar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: VaccinationFilterBarProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E7E5E4] bg-white p-3 shadow-sm md:p-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="relative w-full xl:max-w-md">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#A8A29E]" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="
            Search dependents...
          "
          className="h-11 rounded-xl border-[#E7E5E4] pl-10 focus-visible:ring-[#7C3AED]"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-11 w-full rounded-xl border-[#E7E5E4] sm:w-[180px]">
            <SelectValue
              placeholder="
                Filter Status
              "
            />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>

            <SelectItem value="UPCOMING">Upcoming</SelectItem>

            <SelectItem value="COMPLETED">Completed</SelectItem>

            <SelectItem value="OVERDUE">Overdue</SelectItem>
          </SelectContent>
        </Select>

        <Button className="h-11 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </div>
    </div>
  )
}

export default VaccinationFilterBar
