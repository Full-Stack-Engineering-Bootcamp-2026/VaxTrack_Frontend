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

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button
        variant="outline"
        className="h-11 rounded-xl border-[#E7E5E4]"
        onClick={() => exportVaccinationReport(records)}
      >
        <Download className="size-4" />
        Export Report
      </Button>

      <Button
        className="h-11 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]"
        onClick={() => navigate("/staff/vaccines")}
      >
        <Plus className="size-4" />
        Record Vaccine
      </Button>
    </div>
  )
}

export default DashboardTopbarActions
