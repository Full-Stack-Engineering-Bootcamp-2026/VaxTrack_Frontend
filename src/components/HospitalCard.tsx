import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
const NearbyClinicCard = () => {
    return (
        <Card className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-[#F5F5F4] shadow-sm">
            <div className="relative h-44 w-full">
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                    alt="map"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#7C3AED] bg-white shadow-lg">
                        <MapPin className="h-8 w-8 text-[#7C3AED]" />
                    </div>
                </div>
            </div>
            <CardContent className="space-y-5 p-6">
                <div>
                    <h2 className="text-3xl font-semibold text-[#1C1917]">
                        Elite Healthcare
                    </h2>
                    <p className="mt-2 text-xl text-[#57534E]">
                        750 m away
                    </p>
                </div>
                <Button className="h-12 w-full rounded-xl bg-[#DDD6FE] text-lg font-medium text-[#5B21B6] hover:bg-[#C4B5FD]">
                    Book Appointment
                </Button>
            </CardContent>
        </Card>
    )
}

export default NearbyClinicCard