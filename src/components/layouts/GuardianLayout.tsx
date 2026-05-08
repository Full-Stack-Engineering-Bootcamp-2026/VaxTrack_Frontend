import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/NavBar";
import Footer from "../ui/Footer";
import { SidebarProvider } from "../ui/sidebar";

const GuardianLayout = () => {
    return (
        <SidebarProvider>
            <div className="min-h-screen w-full overflow-x-hidden">
                <Navbar />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </SidebarProvider>
    );
};

export default GuardianLayout;