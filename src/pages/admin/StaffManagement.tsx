import axios from "axios"
import {
    Edit,
    ShieldCheck,
    Trash2,
} from "lucide-react"
import { MdKey } from "react-icons/md";
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { AddStaffModal } from "@/components/AddStaffModal";

const StaffManagement = () => {
    const { token } = useSelector(
        (state: RootState) => state.auth
    )
    const { data } = useQuery({
        queryKey: ["staffAccounts"],
        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:3000/api/users/staff?page=1&limit=10",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            return response.data
        },
    })
    const staff =
        data?.data?.data || []


    return (
        <div className="min-h-screen bg-[#FAFAF9] px-10 py-8">

            <div className="mx-auto max-w-6xl">

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-4xl font-bold text-[#1C1917]">
                            Staff Accounts
                        </h1>
                    </div>
                    <AddStaffModal>
                        <button className="rounded-xl bg-[#7C3AED] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#6D28D9]">
                            + Add Staff Account
                        </button>
                    </AddStaffModal>
                </div>

                <div className="mt-8 flex items-center gap-3">
                    <button className="rounded-lg bg-[#EEE5FF] px-4 py-2 text-sm font-medium text-[#7C3AED]">
                        All Staff
                    </button>

                    <button className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100">
                        Active
                    </button>

                    <button className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100">
                        Inactive
                    </button>

                    <p className="ml-3 text-sm text-gray-400">
                        Showing {staff.length} staff members
                    </p>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white">

                    <div className="grid grid-cols-5 border-b bg-[#F5F5F4] px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#78716C]">
                        <p>Staff Member</p>
                        <p>Status</p>
                        <p>Joined Date</p>
                        <p>Last Activity</p>
                        <p className="text-right">
                            Actions
                        </p>
                    </div>

                    <div>
                        {staff.map(
                            (member: any) => (
                                <div
                                    key={member.id}
                                    className="grid grid-cols-5 items-center border-b px-6 py-5 last:border-b-0"
                                >
                                    <div className="flex items-center gap-4">

                                        <img
                                            src={`https://i.pravatar.cc/150?u=${member.email}`}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />

                                        <div>
                                            <h3 className="font-medium text-[#1C1917]">
                                                {member.fullName}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-400">
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                            Active
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            member.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Recently Active
                                    </p>

                                    <div className="flex justify-end gap-4 text-gray-400">

                                        <button className="transition hover:text-[#7C3AED]">
                                            <Edit className="h-4 w-4" />
                                        </button>

                                        <button className="transition hover:text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </button>

                                        <button className="transition hover:text-[#7C3AED]">
                                            <ShieldCheck className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="flex items-center justify-between bg-[#FAFAF9] px-6 py-4">

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Items per page:</span>

                            <button className="font-medium text-[#1C1917]">
                                10
                            </button>
                        </div>

                        <p className="text-sm text-gray-500">
                            1 - {staff.length} of{" "}
                            {staff.length}
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <Card className="rounded-2xl border-l-4 border-l-[#7C3AED] shadow-none">
                        <CardContent className="space-y-5 p-6">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEE5FF]">
                                <MdKey className="h-5 w-5 text-[#7C3AED]" />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#1C1917]">
                                    Access Control
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Manage permissions and security roles for all medical staff.
                                </p>
                            </div>

                            <button className="text-sm font-medium text-[#7C3AED]">
                                Manage Roles →
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-l-4 border-l-green-400 shadow-none">
                        <CardContent className="space-y-5 p-6">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-[#1C1917]">
                                    Activity Logs
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    View comprehensive audit trails of staff interactions.
                                </p>
                            </div>

                            <button className="text-sm font-medium text-[#7C3AED]">
                                View Logs →
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-0 bg-linear-to-br from-[#7C3AED] to-[#9333EA] text-white shadow-none">
                        <CardContent className="space-y-5 p-6">

                            <div>
                                <h3 className="text-2xl font-semibold">
                                    System Security
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-purple-100">
                                    All staff actions are encrypted and HIPAA compliant for data protection.
                                </p>
                            </div>

                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#7C3AED]">
                                Security Settings
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default StaffManagement