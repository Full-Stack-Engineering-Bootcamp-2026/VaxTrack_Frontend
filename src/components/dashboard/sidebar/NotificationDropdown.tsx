import { NavLink } from "react-router-dom"

import type { LucideIcon } from "lucide-react"

interface SidebarNavItemProps {
  to: string
  label: string
  icon: LucideIcon
}

const SidebarNavItem = ({ to, label, icon: Icon }: SidebarNavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
          isActive
            ? `bg-[#F5F3FF] text-[#7C3AED]`
            : `text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917]`
        } `
      }
    >
      <Icon className="size-5" />

      <span>{label}</span>
    </NavLink>
  )
}

export default SidebarNavItem
