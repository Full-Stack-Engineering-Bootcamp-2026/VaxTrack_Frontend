import { Download, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

const DashboardTopbarActions = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button variant="outline" className="h-11 rounded-xl border-[#E7E5E4]">
        <Download className="size-4" />
        Export Report
      </Button>

      <Button className="h-11 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]">
        <Plus className="size-4" />
        Record Vaccine
      </Button>
    </div>
  )
}

export default DashboardTopbarActions
