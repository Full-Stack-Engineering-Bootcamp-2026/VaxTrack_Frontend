import { Syringe, FileText, Users, AlertTriangle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

const actions = [
  {
    title: "Record Vaccine",
    description: "Add a new vaccination record",
    icon: Syringe,
  },
  {
    title: "Generate Report",
    description: "Export vaccination reports",
    icon: FileText,
  },
  {
    title: "Manage Dependents",
    description: "View dependent records",
    icon: Users,
  },
  {
    title: "Overdue Cases",
    description: "Review pending vaccinations",
    icon: AlertTriangle,
  },
]

const QuickActionsCard = () => {
  return (
    <Card className="rounded-2xl border border-[#E7E5E4] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#1C1917]">
          Quick Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Button
              key={action.title}
              variant="outline"
              className="flex h-auto items-start justify-start gap-4 rounded-2xl border-[#E7E5E4] p-4 text-left hover:bg-[#FAFAF9]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#F5F3FF] text-[#7C3AED]">
                <Icon className="size-5" />
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-[#1C1917]">{action.title}</p>

                <p className="text-xs leading-relaxed text-[#78716C]">
                  {action.description}
                </p>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default QuickActionsCard
