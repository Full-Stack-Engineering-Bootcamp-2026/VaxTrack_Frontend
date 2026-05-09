import { useState } from "react"
import { Syringe, AlertTriangle, ShieldCheck, Clock3 } from "lucide-react"
import StatsCard from "@/components/dashboard/stats/StatsCard"
import { useGetUpcomingVaccinationsQuery } from "@/redux/apis/vaccinationRecordApi"
import VaccinationTableSkeleton from "@/components/dashboard/table/VaccinationTableSkeleton"
import VaccinationTable from "@/components/dashboard/table/VaccinationTable"
import DashboardSectionHeader from "@/components/dashboard/shared/DashboardSectionHeader"
import VaccinationFilterBar from "@/components/dashboard/filters/VaccinationFilterBar"
import {
  useGetComplianceQuery,
  useGetStatusBreakdownQuery,
} from "@/redux/apis/dashboardApi"
import RecentActivitiesCard from "@/components/dashboard/activity/RecentActivitiesCard"
import StatsCardSkeleton from "@/components/dashboard/stats/StatsCardSkeleton"
import DashboardTopbarActions from "@/components/dashboard/shared/DashboardTopbarActions"
import ComplianceProgressCard from "@/components/dashboard/charts/ComplianceProgressCard"
import VaccinationTrendChart from "@/components/dashboard/charts/VaccinationTrendChart"
import QuickActionsCard from "@/components/dashboard/cards/QuickActionsCard"
import DashboardGreeting from "@/components/dashboard/shared/DashboardGreeting"

const StaffDashboard = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const [status, setStatus] = useState("ALL")
  const { data, isLoading } = useGetUpcomingVaccinationsQuery({
    page,
    limit: 10,
  })
  const { data: complianceData } = useGetComplianceQuery()

  const { data: statusData } = useGetStatusBreakdownQuery()

  return (
    <div className="min-h-screen bg-[#FAFAF9] p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <DashboardGreeting />

          <DashboardTopbarActions />
        </div>
        {!statusData || !complianceData ? (
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
              subtitle="
            Successfully administered
          "
              icon={<Syringe className="size-5" />}
            />

            <StatsCard
              title="Overdue"
              value={statusData.overdue}
              subtitle="
            Requires attention
          "
              icon={<AlertTriangle className="size-5" />}
            />

            <StatsCard
              title="Compliance"
              value={`${complianceData.complianceRate}%`}
              subtitle="
            Vaccination completion
          "
              icon={<ShieldCheck className="size-5" />}
            />

            <StatsCard
              title="Upcoming"
              value={statusData.upcoming}
              subtitle="
            Scheduled vaccinations
          "
              icon={<Clock3 className="size-5" />}
            />
          </div>
        )}

        <ComplianceProgressCard
          complianceRate={complianceData?.complianceRate || 0}
        />

        <VaccinationTrendChart />

        <QuickActionsCard />

        <VaccinationFilterBar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
          <div>
            {isLoading ? (
              <VaccinationTableSkeleton />
            ) : (
              <VaccinationTable
                records={data?.data || []}
                pagination={
                  data?.pagination || {
                    page: 1,

                    totalPages: 1,

                    hasNextPage: false,

                    hasPreviousPage: false,
                  }
                }
                onPageChange={setPage}
              />
            )}
          </div>

          <RecentActivitiesCard />
        </div>
      </div>
    </div>
  )
}

export default StaffDashboard
