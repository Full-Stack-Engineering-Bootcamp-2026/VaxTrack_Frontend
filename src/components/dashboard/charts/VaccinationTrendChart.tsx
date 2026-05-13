import { TrendingUp } from "lucide-react"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import axios from "axios"
import { useEffect, useState } from "react"

interface VaccinationTrendChartProps {
  records?: any[]
}

const chartConfig = {
  vaccinations: {
    label: "Vaccinations",

    color: "#7C3AED",
  },
} satisfies ChartConfig

const VaccinationTrendChart = () => {
  const [records, setRecords] = useState<any[]>([])

  const getToken = () => {
    const persistedState = localStorage.getItem("persist:root")

    const parsedState = persistedState ? JSON.parse(persistedState) : null

    const auth = parsedState?.auth ? JSON.parse(parsedState.auth) : null

    return auth?.token
  }
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  }

  const getRecord = async () => {
    const resp = await axios.get(
      `http://localhost:3000/api/vaccination-record/trend`,
      {
        headers,
      }
    )
    const chartData = resp.data?.data || []
    setRecords(chartData)
  }
  useEffect(() => {
    getRecord()
  }, [])

  const monthlyData = records

  return (
    <Card className="rounded-2xl border border-[#E7E5E4] shadow-sm">
      <CardHeader>
        <CardTitle>Vaccination Trends</CardTitle>

        <CardDescription>Monthly vaccination activity</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <AreaChart
            accessibilityLayer
            data={monthlyData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <defs>
              <linearGradient id="fillVaccinations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />

                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="vaccinations"
              type="natural"
              fill="url(#fillVaccinations)"
              fillOpacity={0.4}
              stroke="#7C3AED"
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Trending vaccination activity
          <TrendingUp className="size-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default VaccinationTrendChart
