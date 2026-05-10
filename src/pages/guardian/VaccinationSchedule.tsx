import axios from "axios"
import { useParams, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/stores/store"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
interface VaccinationRecord {
    id: number
    dueDate: string
    status: string
    vaccine: {
        name: string
        recommendedAge: string
    }
}
const VaccinationSchedulePage = () => {
    const { dependentId } = useParams()
    const [searchParams] = useSearchParams();
    const dependentName = searchParams.get("name")
    const { token } = useSelector(
        (state: RootState) => state.auth
    )
    const { data, isLoading } = useQuery({
        queryKey: [
            "vaccinationSchedule",
            dependentId,
        ],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:3000/api/vaccination-record/dependent/${dependentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            return response.data.data
        },
    })
    if (isLoading) {
        return (
            <div className="p-10">
                Loading...
            </div>
        )
    }
    const records: VaccinationRecord[] =
        data?.data || []
    return (
        <div className="min-h-screen bg-[#FAFAF9] p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-[#1C1917]">
                        {dependentName}'s Vaccination Schedule
                    </h1>

                    <p className="mt-2 text-sm text-[#78716C]">
                        Track all vaccination records.
                    </p>

                </div>

                <div className="grid gap-4 md:grid-cols-3">

                    <Card>

                        <CardContent className="p-5">

                            <p className="text-sm text-[#78716C]">
                                Completed
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-green-600">
                                {
                                    records.filter(
                                        (record) =>
                                            record.status === "COMPLETED"
                                    ).length
                                }
                            </h2>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardContent className="p-5">

                            <p className="text-sm text-[#78716C]">
                                Upcoming
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                {
                                    records.filter(
                                        (record) =>
                                            record.status === "UPCOMING"
                                    ).length
                                }
                            </h2>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardContent className="p-5">

                            <p className="text-sm text-[#78716C]">
                                Overdue
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-red-600">
                                {
                                    records.filter(
                                        (record) =>
                                            record.status === "OVERDUE"
                                    ).length
                                }
                            </h2>

                        </CardContent>

                    </Card>

                </div>

                <div className="space-y-4">

                    {records.map((record) => (

                        <Card
                            key={record.id}
                            className="rounded-2xl border border-[#E7E5E4]"
                        >

                            <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">

                                <div>

                                    <h2 className="text-lg font-semibold text-[#1C1917]">
                                        {record.vaccine.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-[#78716C]">
                                        {record.vaccine.recommendedAge}
                                    </p>

                                </div>

                                <div className="flex items-center gap-4">

                                    <p className="text-sm text-[#78716C]">
                                        {new Date(record.dueDate).toLocaleDateString()}
                                    </p>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${record.status === "COMPLETED"
                                            ? "bg-green-100 text-green-600"
                                            : record.status === "UPCOMING"
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {record.status}
                                    </span>

                                </div>

                            </CardContent>

                        </Card>
                    ))}

                </div>

            </div>

        </div>
    )
}

export default VaccinationSchedulePage
