import axios from "axios"
import {
    CheckCircle,
    Plus,
    ShieldCheck,
    Trash2,
} from "lucide-react"

import { TiCancel } from "react-icons/ti"
import { MdKey } from "react-icons/md"

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import { useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { AddStaffModal } from "@/components/AddStaffModal"

import { toast } from "react-toastify"

const StaffManagement = () => {

    const queryClient = useQueryClient()

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

    const deleteStaffMutation = useMutation({

        mutationFn: async (id: number) => {

            return axios.patch(
                `http://localhost:3000/api/users/staff/${id}/deactivate`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        },

        onSuccess: () => {

            toast.success(
                "Staff deactivated successfully"
            )

            queryClient.invalidateQueries({
                queryKey: ["staffAccounts"],
            })
        },

        onError: () => {

            toast.error(
                "Failed to deactivate staff"
            )
        }
    })

    const activateStaffMutation = useMutation({

        mutationFn: async (id: number) => {

            return axios.patch(
                `http://localhost:3000/api/users/staff/${id}/activate`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        },

        onSuccess: () => {

            toast.success(
                "Staff activated successfully"
            )

            queryClient.invalidateQueries({
                queryKey: ["staffAccounts"],
            })
        },

        onError: () => {

            toast.error(
                "Failed to activate staff"
            )
        }
    })

    const staff =
        data?.data?.data || []

    return (
        <div className="min-h-screen bg-[#FAFAF9] px-4 py-8 md:px-10">

            <div className="mx-auto max-w-6xl">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

                <div className="mt-8 flex flex-wrap items-center gap-3">

                    <button className="rounded-lg bg-[#EEE5FF] px-4 py-2 text-sm font-medium text-[#7C3AED]">
                        All Staff
                    </button>

                    <button className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100">
                        Active
                    </button>

                    <button className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100">
                        Inactive
                    </button>

                    <p className="ml-0 text-sm text-gray-400 md:ml-3">
                        Showing {staff.length} staff members
                    </p>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white">

                    <div className="overflow-x-auto">

                        <Table className="min-w-225">

                            <TableHeader className="bg-[#F5F5F4]">

                                <TableRow>

                                    <TableHead>
                                        Staff Member
                                    </TableHead>

                                    <TableHead>
                                        Status
                                    </TableHead>

                                    <TableHead>
                                        Joined Date
                                    </TableHead>

                                    <TableHead>
                                        Last Activity
                                    </TableHead>

                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>

                                </TableRow>
                            </TableHeader>

                            <TableBody>

                                {staff.map((member: any) => (

                                    <TableRow key={member.id}>

                                        <TableCell>

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

                                        </TableCell>

                                        <TableCell>

                                            {member.isActive ? (

                                                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">

                                                    <CheckCircle className="h-4 w-4" />

                                                    Active

                                                </span>

                                            ) : (

                                                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">

                                                    <TiCancel className="h-4 w-4" />

                                                    Inactive

                                                </span>
                                            )}

                                        </TableCell>

                                        <TableCell className="text-sm text-gray-500">

                                            {new Date(
                                                member.createdAt
                                            ).toLocaleDateString()}

                                        </TableCell>

                                        <TableCell className="text-sm text-gray-500">
                                            Recently Active
                                        </TableCell>

                                        <TableCell>

                                            <div className="flex justify-end gap-4">

                                                {!member.isActive && (

                                                    <button
                                                        onClick={() =>
                                                            activateStaffMutation.mutate(member.id)
                                                        }
                                                        className="transition hover:text-green-500"
                                                    >

                                                        <Plus className="h-4 w-4" />

                                                    </button>
                                                )}

                                                {member.isActive && (

                                                    <button
                                                        onClick={() =>
                                                            deleteStaffMutation.mutate(member.id)
                                                        }
                                                        className="transition hover:text-red-500"
                                                    >

                                                        <Trash2 className="h-4 w-4" />

                                                    </button>
                                                )}

                                            </div>

                                        </TableCell>

                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between border-t bg-[#FAFAF9] px-6 py-4">

                        <div className="flex items-center gap-2 text-sm text-gray-500">

                            <span>
                                Items per page:
                            </span>

                            <button className="font-medium text-[#1C1917]">
                                10
                            </button>

                        </div>

                        <p className="text-sm text-gray-500">

                            1 - {staff.length} of {staff.length}

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
                                Manage Roles
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
                                View Logs
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