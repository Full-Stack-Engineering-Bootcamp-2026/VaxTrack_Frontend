import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const MedicalTipCard = () => {
    return (
        <Card className="rounded-2xl border border-[#E7E5E4] shadow-sm">

            <CardContent className="flex flex-col gap-5 p-4 md:flex-row md:items-center">

                <img
                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
                    alt="medical room"
                    className="h-35 w-full rounded-xl object-cover md:w-[320px]"
                />

                <div className="flex flex-col">

                    <span className="mb-3 w-fit rounded-full bg-[#DCFCE7] px-3 py-1 text-[10px] font-semibold text-[#15803D]">
                        MEDICAL TIP
                    </span>

                    <h2 className="text-3xl font-bold text-[#6D28D9]">
                        Keeping Up with Boosters
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-[#78716C]">
                        Immunization is a lifelong journey. While primary
                        series are critical in infancy, boosters during
                        school-age and adolescence ensure continued
                        protection against evolving viruses. Always consult
                        your pediatrician for a personalized catch-up schedule.
                    </p>

                    <button className="mt-4 flex items-center gap-2 text-sm font-medium text-[#7C3AED]">
                        Read our Vaccination Guide
                        <ArrowRight className="h-4 w-4" />
                    </button>

                </div>

            </CardContent>

        </Card>
    );
};

export default MedicalTipCard;