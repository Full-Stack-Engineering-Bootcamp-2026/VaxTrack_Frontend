import {
    AlertTriangle,
    Calendar,
} from "lucide-react"

import NotificationCard from "@/components/NotificationCard"
import { NotificationSidebar } from "@/components/NotificationSidebar"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/stores/store"
import { useState } from "react"

type VaccineNotification = {
    id: number
    vaccine: {
        name: string
    }
    dependent: {
        fullName: string
    }
    dueDate: string
}

export default function NotificationsPage() {
    const [filter, setFilter] = useState("ALL");

    const { token } = useSelector(
        (state: RootState) => state.auth
    )

    const { data: upcomingData = [] } = useQuery({
        queryKey: ["upcomingVaccines"],

        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:3000/api/vaccination-record/upcoming",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            return response.data.data.data
        },
    })

    const { data: overdueData = [] } = useQuery({
        queryKey: ["overdueVaccines"],

        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:3000/api/vaccination-record/overdue",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            return response.data.data.data
        },
    })
    const upcomingNotifications = (upcomingData as VaccineNotification[]).map((item) => ({
        id: item.id,
        title: "Upcoming Vaccine",
        description: `${item.vaccine.name} is due soon for ${item.dependent.fullName}.`,
        icon: Calendar,
        iconStyle: "bg-blue-100 text-blue-600",
        badge: "Upcoming",
        badgeStyle: "bg-blue-100 text-blue-600",
        user: item.dependent.fullName,
        time: new Date(item.dueDate).toLocaleDateString(),
    }))

    const overdueNotifications = (overdueData as VaccineNotification[]).map((item) => ({
        id: item.id,
        title: "Overdue Vaccine",
        description: `${item.vaccine.name} is overdue for ${item.dependent.fullName}.`,
        icon: AlertTriangle,
        iconStyle: "bg-red-100 text-red-600",
        badge: "Overdue",
        badgeStyle: "bg-red-100 text-red-600",
        user: item.dependent.fullName,
        time: new Date(item.dueDate).toLocaleDateString(),
    }))

    const filteredNotifications = filter === "UPCOMING" ? upcomingNotifications : filter === "OVERDUE" ? overdueNotifications : [
        ...upcomingNotifications,
        ...overdueNotifications,
    ]
    const allCount = upcomingNotifications.length + overdueNotifications.length;
    return (
        <div className="min-h-screen bg-[#FAFAF9]">
            <div className="px-10 py-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-5xl font-bold text-[#222]">
                            Notifications
                        </h1>

                        <p className="mt-3 text-gray-500">
                            Keep track of upcoming immunizations and
                            overdue vaccines for your dependents.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex">
                <NotificationSidebar filter={filter} setFilter={setFilter} allCount={allCount} />

                <main className="flex-1">
                    <div className="mx-auto max-w-5xl space-y-10 px-10 py-8">

                        {filteredNotifications.length > 0 ? (
                            <section>
                                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    {filter === "UPCOMING"
                                        ? "Upcoming Vaccines"
                                        : filter === "OVERDUE"
                                            ? "Overdue Vaccines"
                                            : "All Notifications"}
                                </p>
                                <div className="space-y-4">
                                    {filteredNotifications.map(
                                        (item) => (
                                            <NotificationCard
                                                key={item.id}
                                                item={item}
                                            />
                                        )
                                    )}
                                </div>
                            </section>
                        ) : (
                            <div className="flex h-75 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
                                <div className="text-center">
                                    <h2 className="text-lg font-semibold text-[#222]">
                                        No Notifications
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Everything is up to date
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}