import {
    Menu,
    CheckCircle2,
    Calendar,
    AlertTriangle,
} from "lucide-react"


type Props = {
    filter: string
    setFilter: (
        value: string
    ) => void
    allCount: number
}
export function NotificationSidebar({
    filter,
    setFilter,
    allCount
}: Props) {
    const filters = [
        {
            title: "All",
            value: "ALL",
            icon: Menu,
            count: allCount,
            active: true,
        },
        {
            title: "Unread",
            value: "UNREAD",
            icon: CheckCircle2,
            count: allCount,
        },
        {
            title: "Upcoming",
            value: "UPCOMING",
            icon: Calendar,
        },
        {
            title: "Overdue",
            value: "OVERDUE",
            icon: AlertTriangle,
        },
    ]
    return (
        <div>
            <div className="px-4 py-6">
                <div>
                    <div className="space-y-2">
                        {filters.map((item) => (
                            <div key={item.title} onClick={() => setFilter(item.value)
                            }>
                                <div
                                    className={`flex h-11 cursor-pointer items-center gap-3 rounded-xl px-3 transition ${filter === item.value
                                        ? "bg-[#EEE5FF] text-[#7C3AED]"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />

                                    <span className="text-sm font-medium">
                                        {item.title}
                                    </span>

                                    {item.count && (
                                        <div className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7C3AED] px-1.5 text-[10px] text-white">
                                            {item.count}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}