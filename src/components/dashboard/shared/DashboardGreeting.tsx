import { useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"

const DashboardGreeting = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const currentHour = new Date().getHours()

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening"

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <img
          src={user?.imageUrl || ""}
          alt="profile"
          className="size-14 rounded-2xl object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1C1917]">
            {greeting}, {user?.fullName}
          </h1>

          <p className="mt-1 text-sm text-[#78716C]">
            Monitor and manage vaccination records
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardGreeting
