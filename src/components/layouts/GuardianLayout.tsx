import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/NavBar";
import Footer from "../ui/Footer";
import { SidebarProvider } from "../ui/sidebar";

const GuardianLayout = () => {
    return (
        <SidebarProvider className="flex flex-col">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </SidebarProvider>
    );
};

export default GuardianLayout;