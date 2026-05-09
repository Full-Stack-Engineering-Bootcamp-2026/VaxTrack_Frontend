import type { ReactNode } from "react";

interface DashboardSectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const DashboardSectionHeader = ({
  title,
  subtitle,
  action,
}: DashboardSectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-[#1C1917]">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-[#78716C]">{subtitle}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default DashboardSectionHeader;