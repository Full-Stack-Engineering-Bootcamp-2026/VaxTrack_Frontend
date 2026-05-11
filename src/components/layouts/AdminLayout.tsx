import { Outlet } from "react-router-dom";

import Navbar from "@/components/ui/NavBar";

import {
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner"
const AdminLayout = () => {
  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen w-full bg-[#FAFAF9]">
          <Navbar />
          <div className="flex">
            <AppSidebar />
            <main className="w-full">
              <Outlet />
              <Toaster />
            </main>
          </div>
        </div>

      </SidebarProvider>
    </>
  );
};

export default AdminLayout;