import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Card, CardContent } from "@/components/ui/card"

import VaccinationTableActions from "./VaccinationTableActions"

import StatusBadge from "../shared/StatusBadge"

import PaginationControls from "../shared/PaginationControls"

import { useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"

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
  const { user } = useSelector((state: RootState) => state.auth)

  const isStaff = user?.role === "STAFF"
  return (
    <Card className="overflow-hidden rounded-[28px] border border-[#E7E5E4] bg-white shadow-sm">
      <CardContent className="p-6">
        <Table>
          <TableHeader className="bg-[#FAFAF9]">
            <TableRow className="hover:bg-[#FAFAF9]">
              <TableHead className="h-14 pl-6 text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Dependent Name
              </TableHead>

              <TableHead className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Guardian
              </TableHead>

              <TableHead className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Vaccine
              </TableHead>

              <TableHead className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Rec. Age
              </TableHead>

              <TableHead className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Status
              </TableHead>

              <TableHead className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Date Admin.
              </TableHead>

              <TableHead className="text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Administered By
              </TableHead>

              <TableHead className="pr-6 text-right text-[11px] font-semibold tracking-wide text-[#78716C] uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {records.length > 0 ? (
              records.map((record) => {
                const dependentAvatar = `https://i.pravatar.cc/150?u=${record.dependent.id}`

                return (
                  <TableRow
                    key={record.id}
                    className="border-b transition-colors hover:bg-[#FAFAF9]"
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-12 w-1 rounded-full ${
                            record.status === "OVERDUE"
                              ? "bg-red-500"
                              : record.status === "COMPLETED"
                                ? "bg-green-500"
                                : "bg-blue-500"
                          } `}
                        />

                        <img
                          src={dependentAvatar}
                          alt="dependent"
                          className="size-11 rounded-full object-cover"
                        />

                        <div>
                          <p className="text-[15px] leading-5 font-semibold text-[#1C1917]">
                            {record.dependent.fullName}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <p className="text-[14px] font-medium text-[#78716C]">
                        {record?.dependent?.guardian?.fullName || "N/A"}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-[15px] font-medium text-[#1C1917]">
                        {record.vaccine.name}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-[14px] text-[#78716C]">
                        {record?.vaccine?.recommendedAge || "N/A"}
                      </p>
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={record.status} />
                    </TableCell>

                    <TableCell>
                      <p
                        className={`text-[14px] font-medium ${
                          record.status === "OVERDUE"
                            ? "text-red-500"
                            : "text-[#78716C]"
                        } `}
                      >
                        {record.status === "OVERDUE"
                          ? `Expired ${Math.floor(
                              (new Date().getTime() -
                                new Date(record.dueDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )} days ago`
                          : new Date(record.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",

                                day: "numeric",

                                year: "numeric",
                              }
                            )}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-[14px] text-[#78716C]">
                        {typeof record.administeredBy === "object"
                          ? record.administeredBy?.fullName
                          : record.administeredBy || "—"}
                      </p>
                    </TableCell>

                    <TableCell className="pr-6 text-right">
                      {isStaff && record.status === "COMPLETED" ? null : (
                        <VaccinationTableActions
                          id={record.id}
                          status={record.status}
                          onSuccess={refetchData}
                          record={record}
                          refetchData={refetchData}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-28 text-center text-[#78716C]"
                >
                  No vaccination records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-4 border-t px-6 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#78716C]">
            Showing 1-
            {records.length} of {pagination?.total || records.length} records
          </p>

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
