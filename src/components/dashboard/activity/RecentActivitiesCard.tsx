import { formatDistanceToNow } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

import { useEffect, useState } from "react"

import axios from "axios"

interface Activity {
  id: number

  description: string

  createdAt: string

  user: {
    fullName: string
  }
}

const RecentActivitiesCard = () => {
  const [activities, setActivities] = useState<Activity[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const persistedState = localStorage.getItem("persist:root")

        const parsedState = persistedState ? JSON.parse(persistedState) : null

        const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

        const token = auth?.token

        const response = await axios.get(
          "http://localhost:3000/api/activities/recent?page=1&limit=8",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setActivities(response.data.data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <Card className="rounded-2xl border border-[#E7E5E4] shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-[#1C1917]">
          Recent Activities
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {loading
          ? Array.from({
              length: 5,
            }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />

                <Skeleton className="h-3 w-24" />
              </div>
            ))
          : activities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col gap-1 border-b pb-4 last:border-none last:pb-0"
              >
                <p className="text-sm font-medium text-[#1C1917]">
                  {activity.description}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#A8A29E]">
                    {activity.user.fullName}
                  </p>

                  <p className="text-xs text-[#A8A29E]">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
      </CardContent>
    </Card>
  )
}

export default RecentActivitiesCard
