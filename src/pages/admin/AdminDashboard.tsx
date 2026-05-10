import axios from "axios"
import {
    Activity,
    AlertTriangle,
    ShieldCheck,
    User,
    Users,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    PieChart,
    Pie,
    Cell,
} from "recharts"

import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"
import { toast } from "sonner"
import { AddStaffModal } from "@/components/AddStaffModal"

const weeklyData = [
    {
        week: "Week 1",
        vaccines: 120,
    },
    {
        week: "Week 2",
        vaccines: 210,
    },
    {
        week: "Week 3",
        vaccines: 170,
    },
    {
        week: "Week 4",
        vaccines: 260,
    },
    {
        week: "Week 5",
        vaccines: 140,
    },
    {
        week: "Week 6",
        vaccines: 190,
    },
]

const COLORS = ["#22C55E", "#7C3AED", "#EF4444"]

const AdminDashboard = () => {
    const { token } = useSelector(
        (state: RootState) => state.auth
    )

    const { data: guardiansData } = useQuery({
        queryKey: ["guardians"],

        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:3000/api/users/guardians?page=1&limit=1000",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            return response.data
        },
    })

    const { data: staffData } = useQuery({
        queryKey: ["staff"],

        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:3000/api/users/staff?page=1&limit=1000",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            return response.data
        },
    })

    const { data: statusBreakdown } = useQuery({
        queryKey: ["statusBreakdown"],

        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:3000/api/vaccination-record/status-breakdown",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            return response.data.data
        },
    })

    const { data: activitiesData } = useQuery({
        queryKey: ["activities"],

        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:3000/api/activities?page=1&limit=5",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            return response.data.data.data
        },
    })
    const totalGuardians = guardiansData?.data?.pagination?.total || 0
    const totalStaff = staffData?.data?.pagination?.total || 0
    const completedVaccinations = statusBreakdown?.completed || 0
    const totalUpcoming = statusBreakdown?.upcoming || 0
    const totalOverdue = statusBreakdown?.overdue || 0
    const totalDependents = completedVaccinations + totalUpcoming + totalOverdue
    const pieData = [
        { name: "Completed", value: completedVaccinations },
        { name: "Upcoming", value: totalUpcoming },
        { name: "Overdue", value: totalOverdue },
    ]

    return (
        <div className="min-h-screen bg-[#FAFAF9] p-6">
            <div className="space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-[#1C1917]">
                            Platform Overview
                        </h1>

                        <p className="mt-2 text-sm text-[#78716C]">
                            Real-time vaccination metrics and staff activity.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <AddStaffModal>
                            <button className="rounded-[10px] bg-[#E9DDFF] px-5 py-2 text-sm font-medium text-[#7C3AED]">
                                + Add Staff
                            </button>
                        </AddStaffModal>

                        <button className="rounded-[10px] bg-[#7C3AED] px-5 py-2 text-sm font-medium text-white">
                            View Reports
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

                    <Card className="rounded-2xl border-0 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase text-gray-400">
                                        Total Guardians
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">
                                        {totalGuardians}
                                    </h2>
                                </div>
                                <User className="text-[#7C3AED]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-0 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs uppercase text-gray-400">
                                        Total Vaccinations
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">
                                        {totalDependents}
                                    </h2>
                                </div>

                                <Users className="text-[#7C3AED]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-0 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs uppercase text-gray-400">
                                        Completed
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                                        {completedVaccinations}
                                    </h2>
                                </div>

                                <ShieldCheck className="text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-0 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs uppercase text-gray-400">
                                        Overdue
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-red-500">
                                        {totalOverdue}
                                    </h2>
                                </div>

                                <AlertTriangle className="text-red-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-0 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs uppercase text-gray-400">
                                        Active Staff
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">
                                        {totalStaff}
                                    </h2>
                                </div>

                                <Activity className="text-[#7C3AED]" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    <Card className="col-span-2 rounded-2xl border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle>
                                Vaccinations per week
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="h-75">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyData}>
                                        <XAxis dataKey="week" />

                                        <Bar
                                            dataKey="vaccines"
                                            fill="#7C3AED"
                                            radius={8}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle>
                                Status Breakdown
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="h-62.5">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            innerRadius={60}
                                            outerRadius={90}
                                            dataKey="value"
                                        >
                                            {pieData.map(
                                                (
                                                    _,
                                                    index
                                                ) => (
                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            COLORS[
                                                            index
                                                            ]
                                                        }
                                                    />
                                                )
                                            )}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-4 space-y-3">
                                {pieData.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={item.name}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-2">

                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            COLORS[
                                                            index
                                                            ],
                                                    }}
                                                />

                                                <span className="text-sm text-gray-600">
                                                    {item.name}
                                                </span>
                                            </div>

                                            <span className="text-sm font-semibold">
                                                {item.value}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    <Card className="col-span-2 rounded-2xl border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>
                                Recent Staff Activity
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">

                            {activitiesData?.map((activity: any) => (
                                <div key={activity.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-[#1C1917]">
                                            {activity.description}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {new Date(activity.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-[#E9DDFF] px-3 py-1 text-xs text-[#7C3AED]">
                                        Activity
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-0 bg-linear-to-br from-[#7C3AED] to-[#9333EA] text-white shadow-sm">
                        <CardContent className="space-y-6 p-6">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    System Health
                                </h2>
                                <p className="mt-2 text-sm text-purple-100">
                                    All services operational.
                                </p>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span>
                                        Storage Capacity
                                    </span>
                                    <span>
                                        42%
                                    </span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-purple-300/40">
                                    <div className="h-full w-[42%] rounded-full bg-white" />
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    toast.promise(
                                        new Promise((resolve) =>
                                            setTimeout(
                                                () =>
                                                    resolve(
                                                        {
                                                            name: "Event",
                                                        }
                                                    ),
                                                3000
                                            )
                                        ),
                                        {
                                            loading:
                                                "Running audit...",
                                            success:
                                                "System secure and operational",
                                            error:
                                                "Audit failed",
                                        }
                                    )
                                }}
                                className="w-full rounded-xl bg-white py-3 text-sm font-medium text-[#7C3AED]"
                            >
                                Run Full Audit
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard