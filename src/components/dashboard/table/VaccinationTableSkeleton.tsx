    import { Skeleton } from "@/components/ui/skeleton";

const VaccinationTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
         
          <div className="grid grid-cols-6 items-center border-b bg-[#FAFAF9] px-6 py-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-24" />
            ))}
          </div>

   
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center border-b px-6 py-5"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-16" />
              </div>

              <Skeleton className="h-4 w-24" />

              <Skeleton className="h-8 w-24 rounded-full" />

              <Skeleton className="h-4 w-24" />

              <Skeleton className="h-4 w-24" />

              <Skeleton className="ml-auto h-9 w-24 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VaccinationTableSkeleton;