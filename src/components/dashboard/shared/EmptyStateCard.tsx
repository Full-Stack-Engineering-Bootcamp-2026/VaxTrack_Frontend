import type { ReactNode } from "react"

interface EmptyStateCardProps {
  title: string

  description: string

  icon?: ReactNode
}

const EmptyStateCard = ({ title, description, icon }: EmptyStateCardProps) => {
  return (
    <div className="flex min-h-87.5 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#E7E5E4] bg-white p-8 text-center shadow-sm">
      {icon && (
        <div className="flex size-16 items-center justify-center rounded-2xl bg-[#F5F3FF] text-[#7C3AED]">
          {icon}
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[#1C1917]">{title}</h3>

        <p className="max-w-sm text-sm leading-relaxed text-[#78716C]">
          {description}
        </p>
      </div>
    </div>
  )
}

export default EmptyStateCard
