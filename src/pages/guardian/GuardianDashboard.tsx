import axios from "axios"

import { useQuery } from "@tanstack/react-query"

import { useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"

import AddDependentCard from "@/components/AddDependentCard"

import { AddDependentModal } from "@/components/AddDependentModal"

import DependentCard from "@/components/DependentCard"

import HealthInsightsCard from "@/components/HealthInsightsCard"


import MedicalTipCard from "@/components/ui/MedicalTipCard"

import { Button } from "@/components/ui/button"

import { Loader2, PlusCircle } from "lucide-react"
import NearbyClinicCard from "@/components/HospitalCard"

interface DependentStats {

    progress: number

    completed: number

    upcoming: number

    overdue: number
}

interface BackendDependent {

    id: number

    fullName: string

    dateOfBirth: string

    gender: string

    stats: DependentStats
}

const GuardianDashboard = () => {

    const { token, user } = useSelector(
        (state: RootState) => state.auth
    )

    const { data, isLoading } = useQuery({

        queryKey: ["guardianDashboard"],

        queryFn: async () => {

            const response = await axios.get(
                "http://localhost:3000/api/dependents/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            return response.data.data
        },
    })

    const dependents =
        data?.map(
            (
                dependent: BackendDependent,
                index: number
            ) => {

                const dob =
                    new Date(
                        dependent.dateOfBirth
                    )

                const today =
                    new Date()

                const ageInMonths =
                    (today.getFullYear() - dob.getFullYear()) * 12 +
                    (today.getMonth() - dob.getMonth())

                const years =
                    Math.floor(ageInMonths / 12)

                const months = ageInMonths % 12

                return {
                    id: dependent.id,
                    name:
                        dependent.fullName,
                    dob:
                        dob.toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }
                        ),
                    age: years > 0 ? `${years} Years Old` : `${months} Months Old`,
                    progress: dependent.stats.progress,
                    completed: dependent.stats.completed,
                    upcoming: dependent.stats.upcoming,
                    overdue: dependent.stats.overdue,
                    borderColor: dependent.stats.progress > 50 ? "border-l-green-500" : "border-l-red-500"
                }
            }
        ) || []

    return (

        <div className="min-h-screen bg-[#FAFAF9] px-8 py-8 space-y-10">

            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                <div>

                    <h1 className="text-[40px] font-bold text-[#1E1B18] md:text-4xl">

                        Welcome Back {user?.fullName}

                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#78716C]">

                        Your family's health schedule is up to date for this month.

                    </p>

                </div>

                <AddDependentModal>

                    <Button className="h-12 w-46 max-w-full rounded-xl bg-[#7C3AED] px-6 shadow-md hover:bg-[#6D28D9]">

                        <PlusCircle className="mr-2 h-4 w-4" />

                        Add Dependent

                    </Button>

                </AddDependentModal>

            </div>

            {isLoading ? (

                <div className="flex h-64 items-center justify-center">

                    <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />

                </div>

            ) : (

                <div className="grid  items-start grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">

                        {dependents.map((dependent: any) => (

                            <DependentCard
                                key={dependent.id}
                                dependent={dependent}
                            />
                        ))}

                        <AddDependentCard />

                    </div>

                    <div className="space-y-6">

                        <HealthInsightsCard />

                        <NearbyClinicCard />

                    </div>

                </div>
            )}

            <MedicalTipCard />

        </div>
    )
}

export default GuardianDashboard