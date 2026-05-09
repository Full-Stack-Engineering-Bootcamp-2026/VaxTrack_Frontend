
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

const chartData = [
  {
    month: "January",
    vaccinations: 40,
  },
  {
    month: "February",
    vaccinations: 58,
  },
  {
    month: "March",
    vaccinations: 80,
  },
  {
    month: "April",
    vaccinations: 65,
  },
  {
    month: "May",
    vaccinations: 92,
  },
  {
    month: "June",
    vaccinations: 110,
  },
]

const chartConfig = {
  vaccinations: {
    label: "Vaccinations",
    color: "#7C3AED",
  },
} satisfies ChartConfig

const VaccinationTrendChart = () => {
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
            data={chartData}
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
          Trending up by 18%
          <TrendingUp className="size-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default VaccinationTrendChart
