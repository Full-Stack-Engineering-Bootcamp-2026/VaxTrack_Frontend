import { Outlet } from "react-router-dom";

import {
    SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import Footer from "../ui/Footer";

const StaffLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />

            <main className="w-full">
                <Outlet />
            </main>
            <Footer />
        </SidebarProvider>
    );
};

export default StaffLayout;