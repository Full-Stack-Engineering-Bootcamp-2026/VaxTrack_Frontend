import { useEffect, useMemo, useState } from "react"

import axios from "axios"

import { AlertTriangle, ShieldAlert, Syringe } from "lucide-react"

import RecordVaccinationDialog from "@/components/dashboard/dialogs/RecordVaccinationDialog"

const OverdueVaccinationsPage = () => {
  const [records, setRecords] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [pagination, setPagination] = useState<any>(null)

  const [page, setPage] = useState(1)

  const [selectedRecord, setSelectedRecord] = useState<any>(null)

  const [dialogOpen, setDialogOpen] = useState(false)

  const getToken = () => {
    const persistedState = localStorage.getItem("persist:root")

    const parsedState = persistedState ? JSON.parse(persistedState) : null

    const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

    return auth?.token
  }

  const fetchOverdueVaccinations = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        `http://localhost:3000/api/vaccination-record/overdue?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

      setRecords(response.data?.data?.data || [])

      setPagination(response.data?.data?.pagination)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOverdueVaccinations()
  }, [page])

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate)

    const current = new Date()

    const diff = current.getTime() - due.getTime()

    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0)
  }

  const getBadgeColor = (days: number) => {
    if (days >= 30) {
      return "bg-[#BA1A1A]"
    }

    if (days >= 10) {
      return "bg-[#FB923C]"
    }

    return "bg-[#3B82F6]"
  }

  const totalOverdue = pagination?.total || 0

  const dependentsAffected = new Set(
    records.map((record: any) => record.dependent.id)
  ).size

  const mostOverdueVaccine = useMemo(() => {
    const vaccineCounts: Record<string, number> = {}

    records.forEach((record: any) => {
      const vaccineName = record.vaccine.name

      vaccineCounts[vaccineName] = (vaccineCounts[vaccineName] || 0) + 1
    })

    return Object.entries(vaccineCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  }, [records])

  return (
    <div className="min-h-screen bg-[#F5F5F4] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#1C1917]">
            Overdue Vaccinations
          </h1>

          <p className="mt-2 text-sm text-[#78716C]">
            Prioritize follow-ups for critical immunization schedules.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-3xl border border-[#CCC3D8] bg-[#FAF2EC] px-6 py-5 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#FFDAD6]">
              <AlertTriangle className="size-6 text-[#BA1A1A]" />
            </div>

            <div>
              <p className="text-xs font-medium tracking-wide text-[#78716C] uppercase">
                Total Overdue
              </p>

              <h2 className="mt-1 text-4xl font-bold text-[#BA1A1A]">
                {totalOverdue}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl border border-[#CCC3D8] bg-[#FAF2EC] px-6 py-5 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#DCD5FD]">
              <ShieldAlert className="size-6 text-[#630ED4]" />
            </div>

            <div>
              <p className="text-xs font-medium tracking-wide text-[#78716C] uppercase">
                Dependents Affected
              </p>

              <h2 className="mt-1 text-4xl font-bold text-[#1C1917]">
                {dependentsAffected}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl border border-[#CCC3D8] bg-[#FAF2EC] px-6 py-5 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#85F8C4]">
              <Syringe className="size-6 text-[#047857]" />
            </div>

            <div>
              <p className="text-xs font-medium tracking-wide text-[#78716C] uppercase">
                Most Overdue Vaccine
              </p>

              <h2 className="mt-1 text-3xl font-bold text-[#1C1917]">
                {mostOverdueVaccine || "-"}
              </h2>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F5F5F4] px-6 py-5">
            <div>
              <h2 className="text-2xl font-semibold text-[#1C1917]">
                Urgent Action Required
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-5 border-b border-[#F5F5F4] bg-[#FAFAF9] px-6 py-4 text-sm font-semibold text-[#57534E]">
            <p>Dependent Name</p>

            <p>Vaccine Name</p>

            <p>Due Date</p>

            <p>Days Overdue</p>

            <p>Actions</p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-[#78716C]">
              Loading overdue vaccinations...
            </div>
          ) : records.length === 0 ? (
            <div className="p-10 text-center text-[#78716C]">
              No overdue vaccinations found
            </div>
          ) : (
            records.map((record: any) => {
              const daysOverdue = getDaysOverdue(record.dueDate)

              return (
                <div
                  key={record.id}
                  className="grid grid-cols-5 items-center border-b border-[#F5F5F4] px-6 py-5"
                >
                  <div>
                    <p className="font-semibold text-[#1C1917]">
                      {record.dependent.fullName}
                    </p>

                    <p className="mt-1 text-xs text-[#78716C]">
                      ID: VT-
                      {record.id}
                    </p>
                  </div>

                  <p className="text-[#44403C]">{record.vaccine.name}</p>

                  <p className="text-[#44403C]">
                    {new Date(record.dueDate).toLocaleDateString()}
                  </p>

                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium text-white ${getBadgeColor(
                        daysOverdue
                      )}`}
                    >
                      {daysOverdue} Days
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedRecord(record)

                      setDialogOpen(true)
                    }}
                    className="w-fit rounded-xl bg-[#630ED4] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5810B9]"
                  >
                    Record
                  </button>
                </div>
              )
            })
          )}
        </div>

        {pagination && (
          <div className="flex items-center justify-end gap-2">
            <button
              disabled={!pagination.hasPreviousPage}
              onClick={() => setPage((prev: number) => prev - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E7E5E4] bg-white text-sm font-medium text-[#57534E] transition hover:bg-[#F5F5F4] disabled:opacity-50"
            >
              {"<"}
            </button>

            {Array.from({
              length: pagination.totalPages,
            }).map((_, index) => {
              const pageNumber = index + 1

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                    page === pageNumber
                      ? "bg-[#630ED4] text-white"
                      : "border border-[#E7E5E4] bg-white text-[#57534E] hover:bg-[#F5F5F4]"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            })}

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((prev: number) => prev + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E7E5E4] bg-white text-sm font-medium text-[#57534E] transition hover:bg-[#F5F5F4] disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-[#7C3AED] p-6 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">Outreach Templates</h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-[#E9D5FF]">
              Quickly send reminders to guardians for overdue vaccinations using
              our pre-approved pediatric medical templates.
            </p>

            <button className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-[#630ED4] transition hover:bg-[#F5F3FF]">
              View Templates
            </button>
          </div>

          <div className="rounded-3xl bg-[#CCC3D8] p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white">
                ✦
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#1C1917]">
                  Smart Prioritization
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-7 text-[#57534E]">
                  The system highlights records more than 30 days overdue in
                  <span className="font-semibold text-[#BA1A1A]"> red</span> to
                  help you address the most critical immunization gaps first.
                </p>
              </div>
            </div>
          </div>
        </div>

        <RecordVaccinationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          record={selectedRecord}
          refetchData={fetchOverdueVaccinations}
        />
      </div>
    </div>
  )
}

export default OverdueVaccinationsPage
