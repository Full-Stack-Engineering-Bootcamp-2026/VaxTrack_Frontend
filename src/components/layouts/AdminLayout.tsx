import { Outlet } from "react-router-dom";

import Navbar from "@/components/ui/NavBar";

import {
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import Footer from "../ui/Footer";

const AdminLayout = () => {
  return (
    <>
      <Navbar />

      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Outlet />
        </main>
        <Footer />
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;