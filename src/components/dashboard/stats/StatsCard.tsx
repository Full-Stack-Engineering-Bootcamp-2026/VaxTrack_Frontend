import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {

    title: string;

    value: string | number;

    subtitle?: string;

    icon?: ReactNode;
}

const StatsCard = ({
    title,
    value,
    subtitle,
    icon,
}: StatsCardProps) => {

    return (

        <Card
            className="

                rounded-2xl

                border border-[#E7E5E4]

                shadow-sm

                bg-white

                hover:shadow-md

                transition-all
            "
        >

            <CardContent
                className="p-5"
            >

                <div
                    className="
                        flex
                        items-start
                        justify-between
                    "
                >

                    <div
                        className="
                            space-y-2
                        "
                    >

                        <p
                            className="
                                text-sm
                                font-medium
                                text-[#78716C]
                            "
                        >
                            {title}
                        </p>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                text-[#1C1917]
                            "
                        >
                            {value}
                        </h2>

                        {
                            subtitle && (

                                <p
                                    className="
                                        text-xs
                                        text-[#A8A29E]
                                    "
                                >
                                    {subtitle}
                                </p>
                            )
                        }

                    </div>

                    {
                        icon && (

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center

                                    size-11

                                    rounded-xl

                                    bg-[#F5F3FF]

                                    text-[#7C3AED]
                                "
                            >
                                {icon}
                            </div>
                        )
                    }

                </div>

            </CardContent>

        </Card>
    );
};

export default StatsCard;