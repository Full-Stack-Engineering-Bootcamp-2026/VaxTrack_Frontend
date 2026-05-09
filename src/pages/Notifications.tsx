import {
    AlertTriangle,
    Bell,
    Calendar,
    ShieldCheck,
    UserPlus,
    type LucideIcon,
} from "lucide-react"

import NotificationCard from "@/components/NotificationCard"
import { NotificationSidebar } from "@/components/NotificationSidebar"

type ActivityAction =
    | "USER_REGISTERED"
    | "USER_LOGGED_IN"
    | "USER_LOGGED_OUT"
    | "PROFILE_UPDATED"
    | "STAFF_CREATED"
    | "DEPENDENT_CREATED"
    | "DEPENDENT_UPDATED"
    | "DEPENDENT_DELETED"
    | "VACCINE_CREATED"
    | "VACCINE_UPDATED"
    | "VACCINE_DISABLED"
    | "VACCINATION_RECORDED"
    | "VACCINATION_UPDATED"
    | "OVERDUE_MARKED"
    | "PASSWORD_RESET"

type Activity = {
    id: number
    action: ActivityAction
    description: string
    createdAt: string
}

const activities: Activity[] = [
    {
        id: 1,
        action: "VACCINATION_RECORDED",
        description:
            "MMR vaccine recorded successfully for Leo Harrison.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        action: "OVERDUE_MARKED",
        description:
            "Flu Shot marked overdue for Maya Harrison.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        action: "USER_REGISTERED",
        description:
            "New guardian account created successfully.",
        createdAt: "2026-05-08T10:30:00.000Z",
    },
]

const activityConfig: Record<
    ActivityAction,
    {
        icon: LucideIcon
        iconStyle: string
        badge: string
        badgeStyle: string
    }
> = {
    USER_REGISTERED: {
        icon: UserPlus,
        iconStyle: "bg-blue-100 text-blue-600",
        badge: "User",
        badgeStyle: "bg-blue-100 text-blue-600",
    },

    USER_LOGGED_IN: {
        icon: Bell,
        iconStyle: "bg-purple-100 text-purple-600",
        badge: "Login",
        badgeStyle: "bg-purple-100 text-purple-600",
    },

    USER_LOGGED_OUT: {
        icon: Bell,
        iconStyle: "bg-gray-100 text-gray-600",
        badge: "Logout",
        badgeStyle: "bg-gray-100 text-gray-600",
    },

    PROFILE_UPDATED: {
        icon: UserPlus,
        iconStyle: "bg-indigo-100 text-indigo-600",
        badge: "Profile",
        badgeStyle: "bg-indigo-100 text-indigo-600",
    },

    STAFF_CREATED: {
        icon: UserPlus,
        iconStyle: "bg-pink-100 text-pink-600",
        badge: "Staff",
        badgeStyle: "bg-pink-100 text-pink-600",
    },

    DEPENDENT_CREATED: {
        icon: UserPlus,
        iconStyle: "bg-cyan-100 text-cyan-600",
        badge: "Dependent",
        badgeStyle: "bg-cyan-100 text-cyan-600",
    },

    DEPENDENT_UPDATED: {
        icon: UserPlus,
        iconStyle: "bg-cyan-100 text-cyan-600",
        badge: "Dependent",
        badgeStyle: "bg-cyan-100 text-cyan-600",
    },

    DEPENDENT_DELETED: {
        icon: AlertTriangle,
        iconStyle: "bg-red-100 text-red-600",
        badge: "Dependent",
        badgeStyle: "bg-red-100 text-red-600",
    },

    VACCINE_CREATED: {
        icon: ShieldCheck,
        iconStyle: "bg-green-100 text-green-600",
        badge: "Vaccine",
        badgeStyle: "bg-green-100 text-green-600",
    },

    VACCINE_UPDATED: {
        icon: ShieldCheck,
        iconStyle: "bg-green-100 text-green-600",
        badge: "Vaccine",
        badgeStyle: "bg-green-100 text-green-600",
    },

    VACCINE_DISABLED: {
        icon: AlertTriangle,
        iconStyle: "bg-yellow-100 text-yellow-600",
        badge: "Vaccine",
        badgeStyle: "bg-yellow-100 text-yellow-600",
    },

    VACCINATION_RECORDED: {
        icon: ShieldCheck,
        iconStyle: "bg-green-100 text-green-600",
        badge: "Vaccination",
        badgeStyle: "bg-green-100 text-green-600",
    },

    VACCINATION_UPDATED: {
        icon: ShieldCheck,
        iconStyle: "bg-green-100 text-green-600",
        badge: "Vaccination",
        badgeStyle: "bg-green-100 text-green-600",
    },

    OVERDUE_MARKED: {
        icon: AlertTriangle,
        iconStyle: "bg-red-100 text-red-600",
        badge: "Overdue",
        badgeStyle: "bg-red-100 text-red-600",
    },

    PASSWORD_RESET: {
        icon: Calendar,
        iconStyle: "bg-yellow-100 text-yellow-600",
        badge: "Security",
        badgeStyle: "bg-yellow-100 text-yellow-600",
    },
}

const mappedNotifications = activities.map((activity) => ({
    ...activity,
    ...activityConfig[activity.action],
}))

const todayNotifications = mappedNotifications.filter((item) => {
    return (
        new Date(item.createdAt).toDateString() ===
        new Date().toDateString()
    )
})

const yesterdayNotifications = mappedNotifications.filter((item) => {
    const yesterday = new Date()

    yesterday.setDate(yesterday.getDate() - 1)

    return (
        new Date(item.createdAt).toDateString() ===
        yesterday.toDateString()
    )
})

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-[#FAFAF9]">
            <div className=" px-10 py-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-5xl font-bold text-[#222]">
                            Notifications
                        </h1>

                        <p className="mt-3 text-gray-500">
                            Keep track of upcoming immunizations and
                            important updates for your family.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <NotificationSidebar />

                <main className="flex-1">
                    <div className="mx-auto max-w-5xl px-10 py-8 space-y-8">

                        {todayNotifications.length > 0 && (
                            <section>
                                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Today
                                </p>

                                <div className="space-y-4">
                                    {todayNotifications.map((item) => (
                                        <NotificationCard
                                            key={item.id}
                                            item={{
                                                title: item.badge,
                                                description: item.description,
                                                icon: item.icon,
                                                iconStyle: item.iconStyle,
                                                badge: item.badge,
                                                badgeStyle: item.badgeStyle,
                                                user: "",
                                                time: new Date(
                                                    item.createdAt
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }),
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {yesterdayNotifications.length > 0 && (
                            <section>
                                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Yesterday
                                </p>

                                <div className="space-y-4">
                                    {yesterdayNotifications.map((item) => (
                                        <NotificationCard
                                            key={item.id}
                                            item={{
                                                title: item.badge,
                                                description: item.description,
                                                icon: item.icon,
                                                iconStyle: item.iconStyle,
                                                badge: item.badge,
                                                badgeStyle: item.badgeStyle,
                                                user: "",
                                                time: new Date(
                                                    item.createdAt
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }),
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}