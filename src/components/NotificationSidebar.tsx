import {
    Menu,
    CheckCircle2,
    Calendar,
    AlertTriangle,
} from "lucide-react"
const filters = [
    {
        title: "All",
        icon: Menu,
        count: 12,
        active: true,
    },
    {
        title: "Unread",
        icon: CheckCircle2,
        count: 4,
    },
    {
        title: "Upcoming",
        icon: Calendar,
    },
    {
        title: "Overdue",
        icon: AlertTriangle,
    },
]

export function NotificationSidebar() {
    return (
        <div>
            <div className="px-4 py-6">
                <div>
                    <div className="space-y-2">
                        {filters.map((item) => (
                            <div key={item.title}>
                                <div
                                    className={`flex h-11 cursor-pointer items-center gap-3 rounded-xl px-3 transition ${item.active
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