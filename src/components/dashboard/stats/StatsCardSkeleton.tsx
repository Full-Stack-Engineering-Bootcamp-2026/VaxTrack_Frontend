import { Card, CardContent } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

const StatsCardSkeleton = () => {
  return (
    <Card className="rounded-2xl border border-[#E7E5E4] bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />

            <Skeleton className="h-9 w-20" />

            <Skeleton className="h-3 w-28" />
          </div>

          <Skeleton className="size-11 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCardSkeleton
