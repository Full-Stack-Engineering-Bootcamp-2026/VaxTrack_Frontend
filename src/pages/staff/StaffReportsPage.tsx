import { useEffect, useMemo, useState } from "react"

import axios from "axios"

import { AlertTriangle, Download } from "lucide-react"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"

import registrationGraph from "@/assets/div.h-48.png"

import { exportVaccinationReport } from "@/utils/exportVaccinationReport"

const StaffReportsPage = () => {
  const [records, setRecords] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [selectedStaff, setSelectedStaff] = useState("ALL")

  const [dateRange, setDateRange] = useState("30")

  const getToken = () => {
    const persistedState = localStorage.getItem("persist:root")

    const parsedState = persistedState ? JSON.parse(persistedState) : null

    const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

    return auth?.token
  }

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        "http://localhost:3000/api/vaccination-record?page=1&limit=200",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )

      setRecords(response.data?.data?.data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredRecords = useMemo(() => {
    const now = new Date()

    return records.filter((record: any) => {
      const createdDate = new Date(record.createdAt)

      const diff =
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)

      const matchesDate = diff <= Number(dateRange)

      const matchesStaff =
        selectedStaff === "ALL"
          ? true
          : record?.administeredBy?.fullName === selectedStaff

      return matchesDate && matchesStaff
    })
  }, [records, dateRange, selectedStaff])

  const staffMembers = useMemo(() => {
    return [
      ...new Set(
        records
          .filter((r: any) => r.administeredBy?.fullName)
          .map((r: any) => r.administeredBy?.fullName)
      ),
    ]
  }, [records])

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {}

    filteredRecords.forEach((record: any) => {
      const date = new Date(record.createdAt).toLocaleDateString()

      grouped[date] = (grouped[date] || 0) + 1
    })

    return Object.entries(grouped).map(([date, count]) => ({
      date,
      count,
    }))
  }, [filteredRecords])

  const overdueSummary = useMemo(() => {
    const grouped: Record<string, number> = {}

    filteredRecords
      .filter((record: any) => record.status === "OVERDUE")
      .forEach((record: any) => {
        const vaccine = record.vaccine.name

        grouped[vaccine] = (grouped[vaccine] || 0) + 1
      })

    return Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
  }, [filteredRecords])

  const exportPDF = () => {
    const completed = filteredRecords.filter(
      (record: any) => record.status === "COMPLETED"
    ).length

    const overdue = filteredRecords.filter(
      (record: any) => record.status === "OVERDUE"
    ).length

    const upcoming = filteredRecords.filter(
      (record: any) => record.status === "UPCOMING"
    ).length

    const complianceRate =
      filteredRecords.length > 0
        ? Math.round((completed / filteredRecords.length) * 100)
        : 0

    exportVaccinationReport({
      records: filteredRecords,

      complianceRate,

      statusData: {
        completed,
        overdue,
        upcoming,
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div>
                <p className="mb-2 text-xs font-medium tracking-wide text-[#78716C] uppercase">
                  Date Range
                </p>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="h-12 rounded-xl border border-[#E7E5E4] bg-white px-4 text-sm outline-none"
                >
                  <option value="7">Last 7 Days</option>

                  <option value="30">Last 30 Days</option>

                  <option value="90">Last 90 Days</option>
                </select>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium tracking-wide text-[#78716C] uppercase">
                  Staff Member
                </p>

                <select
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  className="h-12 rounded-xl border border-[#E7E5E4] bg-white px-4 text-sm outline-none"
                >
                  <option value="ALL">All Staff</option>

                  {staffMembers.map((staff: any) => (
                    <option key={staff} value={staff}>
                      {staff}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={exportPDF}
              className="flex h-12 items-center gap-2 rounded-xl bg-[#7C3AED] px-5 text-sm font-medium text-white transition hover:bg-[#6D28D9]"
            >
              <Download className="size-4" />
              Export PDF Report
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1C1917]">
                Vaccinations Administered
              </h2>

              <div className="flex items-center gap-5 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-[#7C3AED]" />

                  <p className="text-[#78716C]">Completed</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-[#DDD6FE]" />

                  <p className="text-[#78716C]">Scheduled</p>
                </div>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorVaccination"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />

                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" />

                  <XAxis
                    dataKey="date"
                    tick={{
                      fill: "#78716C",
                      fontSize: 12,
                    }}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#7C3AED"
                    fillOpacity={1}
                    fill="url(#colorVaccination)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#F5F5F4]">
              <div className="grid grid-cols-4 bg-[#FAFAF9] px-5 py-4 text-xs font-semibold tracking-wide text-[#78716C] uppercase">
                <p>Date</p>

                <p>Vaccine</p>

                <p>Dependent</p>

                <p>Administered By</p>
              </div>

              {filteredRecords.slice(0, 3).map((record: any) => (
                <div
                  key={record.id}
                  className="grid grid-cols-4 items-center border-t border-[#F5F5F4] px-5 py-4"
                >
                  <p className="text-sm text-[#1C1917]">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-[#1C1917]">
                    {record.vaccine.name}
                  </p>

                  <p className="text-sm text-[#1C1917]">
                    {record.dependent.fullName}
                  </p>

                  <p className="text-sm text-[#1C1917]">
                    {record.administeredBy?.fullName || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1C1917]">
                Overdue Summary
              </h2>

              <AlertTriangle className="size-5 text-[#BA1A1A]" />
            </div>

            <div className="space-y-8">
              {overdueSummary.map(([vaccine, count]) => {
                const width = Math.min(Number(count) * 10, 100)

                return (
                  <div key={vaccine}>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-medium text-[#1C1917]">{vaccine}</p>

                      <p className="text-sm font-semibold text-[#BA1A1A]">
                        {count} Patients
                      </p>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#F5F5F4]">
                      <div
                        style={{
                          width: `${width}%`,
                        }}
                        className="h-full rounded-full bg-[#BA1A1A]"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 border-t border-[#F5F5F4] pt-5">
              <p className="text-sm text-[#78716C]">
                Total Overdue Records:{" "}
                <span className="font-semibold text-[#1C1917]">
                  {
                    filteredRecords.filter(
                      (record: any) => record.status === "OVERDUE"
                    ).length
                  }
                </span>
              </p>

              <button className="mt-5 w-full rounded-xl border border-[#BA1A1A] py-2.5 text-sm font-medium text-[#BA1A1A] transition hover:bg-[#FEF2F2]">
                View Overdue List
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div>
              <h2 className="text-lg font-semibold text-[#1C1917]">
                New Registrations
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#78716C]">
                Monitoring the growth of your medical network. New guardians and
                dependents enrolled this period.
              </p>

              <div className="mt-8 flex gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#7C3AED]">
                    {
                      new Set(
                        filteredRecords.map(
                          (r: any) => r.dependent?.guardian?.id
                        )
                      ).size
                    }
                  </h3>

                  <p className="mt-1 text-xs tracking-wide text-[#78716C] uppercase">
                    Guardians
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#047857]">
                    {
                      new Set(filteredRecords.map((r: any) => r.dependent?.id))
                        .size
                    }
                  </h3>

                  <p className="mt-1 text-xs tracking-wide text-[#78716C] uppercase">
                    Dependents
                  </p>
                </div>
              </div>
            </div>

            <div className="h-72 overflow-hidden rounded-3xl border border-[#E7E5E4]">
              <img
                src={registrationGraph}
                alt="Registration Graph"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffReportsPage
