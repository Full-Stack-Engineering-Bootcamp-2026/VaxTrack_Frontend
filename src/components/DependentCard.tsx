import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    CalendarDays,
    Clock3,
    CheckCircle2,
    Trash2,
    Pencil,
} from "lucide-react";
import axios from "axios"

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query"

import {
    useSelector,
} from "react-redux"

import type {
    RootState,
} from "@/redux/stores/store"

import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { UpdateDependentModal } from "./UpdateDependentModal";

type Dependent = {
    id?: number;
    name: string;
    dob: string;
    age: string;
    progress: number;
    completed: number;
    upcoming: number;
    overdue: number;
    borderColor: string;
};

type Props = {
    dependent: Dependent;
};

const DependentCard = ({ dependent }: Props) => {
    const navigate = useNavigate()
    const queryClient =
        useQueryClient()

    const { token } = useSelector(
        (state: RootState) =>
            state.auth
    )
    const deleteMutation =
        useMutation({

            mutationFn: async () => {

                return axios.delete(
                    `http://localhost:3000/api/dependents/${dependent.id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                )
            },

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: [
                        "guardianDashboard",
                    ],
                })

                toast.success(
                    "Dependent deleted successfully"
                )
            },

            onError: () => {

                toast.error(
                    "Failed to delete dependent"
                )
            },
        })
    return (
        <Card
            className={`w-full rounded-2xl border-l-4 ${dependent.borderColor} border-l-4 bg-[#E7E5E4] shadow-sm`}
        >
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <img
                        src="https://i.pravatar.cc/150?img=5"
                        alt="avatar"
                        className="h-12 w-12 rounded-full object-cover"
                    />

                    <div className="flex-1">
                        <h2 className="text-base font-semibold text-[#1C1917]">
                            {dependent.name}
                        </h2>

                        <p className="text-xs text-[#78716C]">
                            DOB: {dependent.dob}
                        </p>

                        <span className="mt-1 inline-block rounded-full bg-[#EEF2FF] px-2 py-1 text-[10px] font-medium text-[#7C3AED]">
                            {dependent.age}
                        </span>
                    </div>


                </div>
                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs text-[#78716C]">
                            Immunization Progress
                        </p>
                        <span className="text-xs font-semibold text-[#7C3AED]">
                            {dependent.progress}%
                        </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E7E5E4]">
                        <div
                            className="h-full rounded-full bg-[#7C3AED]"
                            style={{
                                width: `${dependent.progress}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">

                    <div className="rounded-xl border border-[#E7E5E4] p-2 text-center">
                        <CheckCircle2 className="mx-auto h-4 w-4 text-green-500" />

                        <p className="mt-1 text-[10px] text-[#78716C]">
                            Completed
                        </p>

                        <p className="text-sm font-semibold text-[#1C1917]">
                            {dependent.completed}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#E7E5E4] p-2 text-center">
                        <Clock3 className="mx-auto h-4 w-4 text-blue-500" />

                        <p className="mt-1 text-[10px] text-[#78716C]">
                            Upcoming
                        </p>

                        <p className="text-sm font-semibold text-[#1C1917]">
                            {dependent.upcoming}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#E7E5E4] p-2 text-center">
                        <CalendarDays className="mx-auto h-4 w-4 text-red-500" />

                        <p className="mt-1 text-[10px] text-[#78716C]">
                            Overdue
                        </p>

                        <p className="text-sm font-semibold text-[#1C1917]">
                            {dependent.overdue}
                        </p>
                    </div>
                </div>
                <div className="mt-5 space-y-2">

                    <Button onClick={() => navigate(`/guardian/vaccination-schedule/${dependent.id}`)} className="h-10 w-full rounded-xl bg-[#7C3AED] text-white hover:bg-[#6D28D9]">
                        View Schedule
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                        <UpdateDependentModal dependent={dependent}>
                            <Button
                                variant="outline"
                                className="rounded-xl border-[#E7E5E4]"
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </UpdateDependentModal>

                        <Button
                            variant="outline"
                            className="rounded-xl border-[#FECACA] text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() =>
                                deleteMutation.mutate()
                            }
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DependentCard;