import { Card, CardContent } from "@/components/ui/card"
import { IoBulbOutline } from "react-icons/io5";
import { BsBagPlus } from "react-icons/bs";
const HealthInsightsCard = () => {
    return (
        <Card className="w-full rounded-xl border border-[#E7E5E4] bg-[#F5F5F4] shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center gap-3">
                    <IoBulbOutline className="h-6 w-6 text-[#7C3AED]" />
                    <h2 className="text-[18px] font-normal text-[#1E1B18]">
                        Health Insights
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9DDFF]">
                            <BsBagPlus className="h-5 w-5 text-[#7C3AED]" />
                        </div>
                        <div>
                            <h3 className="text-[14px] font-semibold text-[#1C1917]">
                                Flu Season is Approaching
                            </h3>
                            <p className="mt-1 text-lg leading-7 text-[#78716C]">
                                Recommended for both dependents before November.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default HealthInsightsCard