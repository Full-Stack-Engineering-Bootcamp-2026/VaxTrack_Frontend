import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ComplianceProgressCardProps {
  complianceRate: number
}

const ComplianceProgressCard = ({
  complianceRate,
}: ComplianceProgressCardProps) => {
  const remainingRate = 100 - complianceRate

  return (
    <Card className="flex h-full flex-col rounded-2xl border border-[#E7E5E4] bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-[#1C1917]">
          Vaccination Compliance
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <div className="space-y-7">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-5xl font-bold tracking-tight text-[#1C1917]">
                  {complianceRate}%
                </h2>

                <p className="mt-2 text-sm text-[#78716C]">
                  Overall completion rate
                </p>
              </div>

              <div className="rounded-xl bg-[#F5F3FF] px-4 py-2 text-sm font-semibold text-[#7C3AED]">
                Healthy
              </div>
            </div>

            <div className="space-y-3">
              <Progress value={complianceRate} className="h-3" />

              <div className="flex items-center justify-between text-sm">
                <p className="text-[#78716C]">
                  {remainingRate}% remaining to full compliance
                </p>

                <p className="font-medium text-[#1C1917]">Target: 100%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#F5F5F4] bg-[#FAFAF9] p-4">
                <p className="text-sm text-[#78716C]">Vaccinated</p>

                <h3 className="mt-2 text-2xl font-bold text-[#1C1917]">
                  {complianceRate}%
                </h3>
              </div>

              <div className="rounded-2xl border border-[#F5F5F4] bg-[#FAFAF9] p-4">
                <p className="text-sm text-[#78716C]">Pending</p>

                <h3 className="mt-2 text-2xl font-bold text-[#1C1917]">
                  {remainingRate}%
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#F5F5F4] pt-5 text-sm">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-[#7C3AED]" />

            <p className="text-[#78716C]">Vaccination Progress</p>
          </div>

          <p className="font-semibold text-[#1C1917]">{complianceRate}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ComplianceProgressCard
