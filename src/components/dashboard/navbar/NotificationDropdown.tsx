import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notifications = [
  {
    title: "New vaccination recorded",
    time: "2 min ago",
  },
  {
    title: "Overdue vaccination alert",
    time: "10 min ago",
  },
  {
    title: "Monthly report generated",
    time: "1 hour ago",
  },
]

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl hover:bg-[#F5F3FF]"
        >
          <Bell className="size-5" />

          <div className="absolute top-2 right-2 size-2 rounded-full bg-red-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-85 rounded-2xl">
        <DropdownMenuLabel className="text-base font-semibold">
          Notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.title}
            className="flex cursor-pointer flex-col items-start gap-1 py-3"
          >
            <p className="text-sm font-medium text-[#1C1917]">
              {notification.title}
            </p>

            <p className="text-xs text-[#A8A29E]">{notification.time}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationDropdown
