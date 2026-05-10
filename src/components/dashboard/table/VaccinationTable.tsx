import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import VaccinationTableActions from "./VaccinationTableActions"
import StatusBadge from "../shared/StatusBadge"
import PaginationControls from "../shared/PaginationControls"

interface VaccinationTableProps {
  records: any[]

  pagination: any

  onPageChange: (page: number) => void

  refetchData: () => void
}

const VaccinationTable = ({
  records,
  pagination,
  onPageChange,
  refetchData,
}: VaccinationTableProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl border border-[#E7E5E4] shadow-sm">
      <CardHeader className="border-b bg-white">
        <CardTitle className="text-lg font-semibold text-[#1C1917]">
          Vaccination Records
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-[#FAFAF9]">
            <TableRow>
              <TableHead>Dependent</TableHead>

              <TableHead>Vaccine</TableHead>

              <TableHead>Due Date</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow
                  key={record.id}
                  className="transition-colors hover:bg-[#FAFAF9]"
                >
                  <TableCell className="font-medium">
                    {record.dependent.fullName}
                  </TableCell>

                  <TableCell>{record.vaccine.name}</TableCell>

                  <TableCell>
                    {new Date(record.dueDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={record.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <VaccinationTableActions
                      id={record.id}
                      status={record.status}
                      onSuccess={refetchData}
                      record={record}
                      refetchData={refetchData}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-[#78716C]"
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="border-t p-4">
          <PaginationControls
            currentPage={pagination?.page || 1}
            totalPages={pagination?.totalPages || 1}
            hasNextPage={pagination?.hasNextPage}
            hasPreviousPage={pagination?.hasPreviousPage}
            onPageChange={onPageChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default VaccinationTable
