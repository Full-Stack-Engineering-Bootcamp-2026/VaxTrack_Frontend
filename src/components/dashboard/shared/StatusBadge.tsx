import { Badge } from "../../../components/ui/badge";

import { cn } from "@/lib/utils";

type Status =| "COMPLETED"    | "UPCOMING"    | "OVERDUE";

interface StatusBadgeProps {
    status: Status;
}

const statusStyles: Record<Status,string> = {

    COMPLETED:
        "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",

    UPCOMING:
        "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",

    OVERDUE:
        "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
};

const statusLabels: Record<
    Status,
    string
> = {

    COMPLETED: "Completed",

    UPCOMING: "Upcoming",

    OVERDUE: "Overdue",
};

const StatusBadge = ({
    status,
}: StatusBadgeProps) => {

    return (
        <Badge
            variant="outline"
            className={cn(

                "rounded-full px-3 py-1 text-[11px] font-semibold border",

                statusStyles[status]
            )}
        >
            {statusLabels[status]}
        </Badge>
    );
};

export default StatusBadge;