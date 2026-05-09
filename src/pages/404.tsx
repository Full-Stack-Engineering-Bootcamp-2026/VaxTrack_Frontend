import VaxTrackLogo from "@/components/svgImages/VaxTrackLogo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#FAFAF6]">
            <div className="flex flex-col gap-5  w-full max-w-xl rounded-[20px] border border-[#E9E5FF] bg-white p-10 shadow-2xl">
                <div className="flex gap-2">
                    <div className="size-12 flex items-center justify-center rounded-[10px] bg-[#7C3AED]">
                        <VaxTrackLogo />
                    </div>
                    <h1 className="text-[#7C3AED] font-sans font-normal text-[32px]">VaxTrack</h1>
                </div>
                <p className="text-[28px] font-semibold uppercase text-[#7C3AED]">
                    Oops! This Page is in Surgery.
                </p>
                <h1 className="mt-3 text-xl font-bold tracking-tight text-[#222]">
                    Please go back or go to the dashboard
                </h1>
                <div className="mt-8 flex flex-wrap gap-4">
                    <Button className="text-[#7C3AED]" variant={"outline"} onClick={() => navigate(-1)} >
                        <ArrowLeft />
                        Go Back
                    </Button>
                    <Button className="text-[#7C3AED]" variant={"outline"} onClick={() => navigate("/guardian/dashboard")} >
                        Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound