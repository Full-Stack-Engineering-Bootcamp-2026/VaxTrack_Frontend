import { Outlet } from "react-router-dom"

import { SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"

import Footer from "../ui/Footer"

const StaffLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F8FAFC]">
        <AppSidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>

          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default StaffLayout
