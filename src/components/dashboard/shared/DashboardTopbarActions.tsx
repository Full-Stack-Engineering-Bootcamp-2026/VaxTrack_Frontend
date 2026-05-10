import { Download, Plus } from "lucide-react"

import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

import { exportVaccinationReport } from "@/utils/exportVaccinationReport"

interface DashboardTopbarActionsProps {
  records?: any[]
}

const DashboardTopbarActions = ({
  records = [],
}: DashboardTopbarActionsProps) => {
  const navigate = useNavigate()

  const handleExport = () => {
    const completed = records.filter(
      (record: any) => record.status === "COMPLETED"
    ).length

    const overdue = records.filter(
      (record: any) => record.status === "OVERDUE"
    ).length

    const upcoming = records.filter(
      (record: any) => record.status === "UPCOMING"
    ).length

    const complianceRate =
      records.length > 0 ? Math.round((completed / records.length) * 100) : 0

    exportVaccinationReport({
      records,

      complianceRate,

      statusData: {
        completed,
        overdue,
        upcoming,
      },
    })
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button
        variant="outline"
        className="h-11 rounded-xl border-[#E7E5E4]"
        onClick={handleExport}
      >
        <Download className="size-4" />
        Export Report
      </Button>

      <Button
        className="h-11 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]"
        onClick={() => navigate("/staff/vaccination-add")}
      >
        <Plus className="size-4" />
        Record Vaccine
      </Button>
    </div>
  )
}

export default DashboardTopbarActions
