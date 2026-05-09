import {
    Skeleton,
} from "@/components/ui/skeleton";

const TableSkeleton = () => {

    return (

        <div
            className="

                overflow-x-auto

                rounded-2xl

                border border-[#E7E5E4]

                bg-white

                shadow-sm
            "
        >

            <div
                className="
                    min-w-[1000px]
                "
            >

                

                <div
                    className="

                        grid

                        grid-cols-7

                        border-b

                        px-6
                        py-4

                        bg-[#FAFAF9]
                    "
                >

                    {
                        Array.from({
                            length: 7,
                        }).map((_, index) => (

                            <Skeleton
                                key={index}

                                className="
                                    h-4
                                    w-24
                                "
                            />
                        ))
                    }

                </div>

              

                {
                    Array.from({
                        length: 6,
                    }).map((_, index) => (

                        <div
                            key={index}

                            className="

                                grid

                                grid-cols-7

                                items-center

                                border-b

                                px-6
                                py-5
                            "
                        >



                            <div
                                className="
                                    space-y-2
                                "
                            >

                                <Skeleton
                                    className="
                                        h-4
                                        w-32
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-3
                                        w-20
                                    "
                                />

                            </div>



                            <Skeleton
                                className="
                                    h-4
                                    w-24
                                "
                            />



                            <Skeleton
                                className="
                                    h-8
                                    w-24
                                    rounded-full
                                "
                            />


                            <Skeleton
                                className="
                                    h-4
                                    w-20
                                "
                            />



                            <Skeleton
                                className="
                                    h-4
                                    w-16
                                "
                            />



                            <Skeleton
                                className="
                                    h-4
                                    w-24
                                "
                            />


                            <Skeleton
                                className="
                                    h-9
                                    w-24
                                    rounded-xl
                                "
                            />

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default TableSkeleton;