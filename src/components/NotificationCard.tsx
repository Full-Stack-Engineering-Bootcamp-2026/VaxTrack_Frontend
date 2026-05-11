import type { LucideIcon } from "lucide-react"

export type NotificationItem = {
    id?: number
    title: string
    description: string
    icon: LucideIcon
    iconStyle: string
    badge: string
    badgeStyle: string
    user?: string
    time: string
}

const NotificationCard = ({ item }: { item: NotificationItem }) => {
    return (
        <div className="flex items-start gap-4 rounded-2xl border bg-[#F5F5F4] p-5 shadow-sm transition hover:shadow-md">
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}
            >
                <item.icon className="h-5 w-5" />
            </div>

            <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-base font-semibold text-[#222]">
                            {item.title}
                        </h3>

                        <p className="mt-1 text-sm  text-gray-500">
                            {item.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {item.user && (
                                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-[#7C3AED]">
                                    {item.user}
                                </span>
                            )}

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.badgeStyle}`}
                            >
                                {item.badge}
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400">{item.time}</p>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard