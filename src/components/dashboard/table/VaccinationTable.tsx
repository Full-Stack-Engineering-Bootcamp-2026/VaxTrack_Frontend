import { FileX2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import StatusBadge from "../shared/StatusBadge"

import PaginationControls from "../shared/PaginationControls"

import EmptyStateCard from "../shared/EmptyStateCard"

import VaccinationTableActions from "./VaccinationTableActions"

export interface VaccinationRecord {
  id: number

  dependent: {
    fullName: string
  }

  vaccine: {
    name: string
  }

  status: "COMPLETED" | "UPCOMING" | "OVERDUE"

  dueDate: string

  administeredBy?: {
    fullName: string
  }
}

interface VaccinationTableProps {
  records: VaccinationRecord[]

  pagination: {
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }

  onPageChange: (page: number) => void
}

const VaccinationTable = ({
  records,
  pagination,
  onPageChange,
}: VaccinationTableProps) => {
  if (!records.length) {
    return (
      <EmptyStateCard
        title="
          No vaccination records found
        "
        description="
          There are currently no
          vaccination records matching
          the selected filters.
        "
        icon={<FileX2 className="size-7" />}
      />
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-sm transition-all">
      <div className="overflow-x-auto">
        <Table className="min-w-237.5 xl:min-w-full">
          <TableHeader className="sticky top-0 z-10 bg-[#FAFAF9]">
            <TableRow className="bg-[#FAFAF9] hover:bg-[#FAFAF9]">
              <TableHead className="h-14 px-4 text-[#78716C] md:px-6">
                Dependent
              </TableHead>

              <TableHead className="text-[#78716C]">Vaccine</TableHead>

              <TableHead className="text-[#78716C]">Status</TableHead>

              <TableHead className="text-[#78716C]">Due Date</TableHead>

              <TableHead className="text-[#78716C]">Staff</TableHead>

              <TableHead className="pr-4 text-right text-[#78716C] md:pr-6">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.id}
                className="h-20 transition-colors hover:bg-[#FAFAF9]"
              >
                <TableCell className="px-4 md:px-6">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-[#1C1917]">
                      {record.dependent.fullName}
                    </p>

                    <p className="text-xs text-[#A8A29E]">ID #{record.id}</p>
                  </div>
                </TableCell>

                <TableCell className="font-medium">
                  {record.vaccine.name}
                </TableCell>

                <TableCell>
                  <StatusBadge status={record.status} />
                </TableCell>

                <TableCell>
                  {new Date(record.dueDate).toLocaleDateString()}
                </TableCell>

                <TableCell>{record.administeredBy?.fullName || "-"}</TableCell>

                <TableCell className="pr-4 text-right md:pr-6">
                  <div className="flex items-center justify-end">
                    <VaccinationTableActions status={record.status} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        page={pagination.page}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default VaccinationTable
