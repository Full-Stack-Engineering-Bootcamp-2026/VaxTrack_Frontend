import { useEffect, useMemo, useState } from "react"

import axios from "axios"

import { AlertTriangle, Clock3, ShieldCheck, Syringe } from "lucide-react"

import StatsCard from "@/components/dashboard/stats/StatsCard"

import VaccinationTableSkeleton from "@/components/dashboard/table/VaccinationTableSkeleton"

import VaccinationTable from "@/components/dashboard/table/VaccinationTable"

import VaccinationFilterBar from "@/components/dashboard/filters/VaccinationFilterBar"

import RecentActivitiesCard from "@/components/dashboard/activity/RecentActivitiesCard"

import StatsCardSkeleton from "@/components/dashboard/stats/StatsCardSkeleton"

import DashboardTopbarActions from "@/components/dashboard/shared/DashboardTopbarActions"

import ComplianceProgressCard from "@/components/dashboard/charts/ComplianceProgressCard"

import VaccinationTrendChart from "@/components/dashboard/charts/VaccinationTrendChart"

import QuickActionsCard from "@/components/dashboard/cards/QuickActionsCard"

import DashboardGreeting from "@/components/dashboard/shared/DashboardGreeting"

import useDebounce from "@/hooks/useDebounce"

const StaffDashboard = () => {
  const [page, setPage] = useState(1)

  const [search, setSearch] = useState("")

  const debouncedSearch = useDebounce(search, 500)

  const [status, setStatus] = useState("ALL")

  const [loading, setLoading] = useState(true)

  const [records, setRecords] = useState<any[]>([])

  const [pagination, setPagination] = useState<any>(null)

  const [complianceRate, setComplianceRate] = useState(0)

  const [statusData, setStatusData] = useState({
    completed: 0,

    overdue: 0,

    upcoming: 0,
  })

  const getToken = () => {
    const persistedState = localStorage.getItem("persist:root")

    const parsedState = persistedState ? JSON.parse(persistedState) : null

    const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

    return auth?.token
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      const headers = {
        Authorization: `Bearer ${getToken()}`,
      }

      const [vaccinationResponse, complianceResponse, statusResponse] =
        await Promise.all([
          axios.get(
            `http://localhost:3000/api/vaccination-record?page=${page}&limit=10`,
            {
              headers,
            }
          ),

          axios.get("http://localhost:3000/api/vaccination-record/compliance", {
            headers,
          }),

          axios.get(
            "http://localhost:3000/api/vaccination-record/status-breakdown",
            {
              headers,
            }
          ),
        ])

      const vaccinationData = vaccinationResponse.data?.data?.data || []

      setRecords(vaccinationData)

      setPagination(vaccinationResponse.data?.data?.pagination)

      setComplianceRate(
        complianceResponse.data?.data?.compliancePercentage || 0
      )

      setStatusData(
        statusResponse.data?.data || {
          completed: 0,

          overdue: 0,

          upcoming: 0,
        }
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [page])

  const filteredRecords = useMemo(() => {
    return records.filter((record: any) => {
      const matchesSearch = record?.dependent?.fullName
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase())

      const matchesStatus = status === "ALL" ? true : record.status === status

      return matchesSearch && matchesStatus
    })
  }, [records, debouncedSearch, status])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAF9]">
      <div className="mx-auto flex w-full max-w-450 flex-col gap-6 px-3 py-4 sm:px-4 md:px-6 2xl:px-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <DashboardGreeting />

          <DashboardTopbarActions records={filteredRecords} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <StatsCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Completed"
              value={statusData.completed}
              subtitle="Successfully administered"
              icon={<Syringe className="size-5" />}
            />

            <StatsCard
              title="Overdue"
              value={statusData.overdue}
              subtitle="Requires attention"
              icon={<AlertTriangle className="size-5" />}
            />

            <StatsCard
              title="Compliance"
              value={`${complianceRate}%`}
              subtitle="Vaccination completion"
              icon={<ShieldCheck className="size-5" />}
            />

            <StatsCard
              title="Upcoming"
              value={statusData.upcoming}
              subtitle="Scheduled vaccinations"
              icon={<Clock3 className="size-5" />}
            />
          </div>
        )}

        <div className="grid auto-rows-fr grid-cols-1 gap-6 xl:grid-cols-[minmax(320px,380px)_1fr] 2xl:grid-cols-[380px_1fr]">
          <div className="h-full">
            <ComplianceProgressCard complianceRate={complianceRate} />
          </div>

          <div className="h-full min-w-0">
            <VaccinationTrendChart records={records} />
          </div>
        </div>

        <div className="w-full">
          <QuickActionsCard records={filteredRecords} />
        </div>

        <div className="w-full">
          <VaccinationFilterBar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 overflow-hidden">
            {loading ? (
              <VaccinationTableSkeleton />
            ) : (
              <VaccinationTable
                records={filteredRecords}
                pagination={pagination}
                onPageChange={setPage}
                refetchData={fetchDashboardData}
              />
            )}
          </div>

          <div className="min-w-0">
            <RecentActivitiesCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffDashboard
