import { Badge } from "../../../components/ui/badge"

import { cn } from "@/lib/utils"

type Status = "COMPLETED" | "UPCOMING" | "OVERDUE"

interface StatusBadgeProps {
  status: Status
}

const statusStyles: Record<Status, string> = {
  COMPLETED: "border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7]",

  UPCOMING: "border-[#BFDBFE] bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#DBEAFE]",

  OVERDUE: "border-[#FECACA] bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FEE2E2]",
}

const statusLabels: Record<Status, string> = {
  COMPLETED: "COMPLETED",

  UPCOMING: "UPCOMING",

  OVERDUE: "OVERDUE",
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide shadow-none",
        statusStyles[status]
      )}
    >
      {statusLabels[status]}
    </Badge>
  )
}

export default StatusBadge
