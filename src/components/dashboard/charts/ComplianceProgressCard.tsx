import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"

interface ComplianceProgressCardProps {
  complianceRate: number
}

const ComplianceProgressCard = ({
  complianceRate,
}: ComplianceProgressCardProps) => {
  return (
    <Card className="rounded-2xl border border-[#E7E5E4] bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-[#1C1917]">
          Vaccination Compliance
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-[#1C1917]">
              {complianceRate}%
            </h2>

            <p className="mt-1 text-sm text-[#78716C]">
              Overall completion rate
            </p>
          </div>

          <div className="rounded-xl bg-[#F5F3FF] px-3 py-2 text-sm font-semibold text-[#7C3AED]">
            Healthy
          </div>
        </div>

        <Progress value={complianceRate} className="h-3" />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-[#7C3AED]" />

            <p className="text-[#78716C]">Vaccinated</p>
          </div>

          <p className="font-medium text-[#1C1917]">{complianceRate}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ComplianceProgressCard
