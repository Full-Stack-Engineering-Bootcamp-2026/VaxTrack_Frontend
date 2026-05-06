import DependentCard from '@/components/DependentCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const dependents = [
    {
        name: "Leo Thompson",
        dob: "12 May 2019",
        age: "5 Years Old",
        progress: 85,
        completed: 12,
        upcoming: 2,
        overdue: 0,
        borderColor: "border-l-green-500",
    },
    {
        name: "Maya Thompson",
        dob: "24 Aug 2021",
        age: "2 Years Old",
        progress: 62,
        completed: 8,
        upcoming: 3,
        overdue: 1,
        borderColor: "border-l-red-400",
    },
    {
        name: "Noah Thompson",
        dob: "15 Jan 2024",
        age: "4 Months Old",
        progress: 15,
        completed: 2,
        upcoming: 4,
        overdue: 0,
        borderColor: "border-l-blue-500",
    },
];
const GuardianDashboard = () => {
    return (
        <div className="min-h-screen bg-[#FAFAF9] px-8 py-8">

            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-[#1C1917]">
                        My Dependents
                    </h1>

                    <p className="mt-2 text-sm text-[#78716C]">
                        Manage and monitor the immunization progress
                        of your family members in one centralized,
                        secure place.
                    </p>
                </div>

                <Button className="rounded-xl h-12 w-50 bg-[#7C3AED] shadow-md hover:bg-[#6D28D9]">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Dependent
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                {dependents.map((dependent) => (
                    <DependentCard
                        key={dependent.name}
                        dependent={dependent}
                    />
                ))}

            </div>
        </div>
    );
}

export default GuardianDashboard