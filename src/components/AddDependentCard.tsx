import { Card, CardContent } from "@/components/ui/card";
import DependentAddIcon from "./svgImages/DependentAddIcon";

const AddDependentCard = () => {
    return (
        <Card className="group cursor-pointer  border-2 border-dashed border-[#D6D3D1] bg-[#FFFFFF] shadow-none transition-all duration-300  hover:bg-gray-50 hover:shadow-md">
            <CardContent className="flex h-65 flex-col items-center justify-center text-center">

                <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-[#F5F5F4] ">
                    <DependentAddIcon />
                </div>

                <h2 className="text-lg font-semibold text-[#44403C]">
                    New Dependent
                </h2>

                <p className="mt-2 max-w-45 text-sm leading-5 text-[#78716C]">
                    Add another family member to track their health journey.
                </p>

            </CardContent>

        </Card>
    );
};

export default AddDependentCard;