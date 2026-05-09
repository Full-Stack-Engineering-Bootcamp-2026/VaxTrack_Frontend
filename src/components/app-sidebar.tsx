import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BarChart3, BellRing, ClipboardList, LayoutGrid, LogOut, Settings, Users } from "lucide-react"
import { GoPlusCircle } from "react-icons/go";
import VaxTrackLogo from "./svgImages/VaxTrackLogo";
const menuItems = [
    {
        title: "Overview",
        icon: LayoutGrid,
        isActive: false,
    },
    {
        title: "Vaccine Catalog",
        icon: ClipboardList,
        isActive: true,
    },
    {
        title: "Overdue Overview",
        icon: BellRing,
        isActive: false,
    },
    {
        title: "Staff Management",
        icon: Users,
        isActive: false,
    },
    {
        title: "Reports",
        icon: BarChart3,
        isActive: false,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="px-5 pt-6 pb-8">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#7C3AED] text-white font-bold shadow-sm">
                        <VaxTrackLogo/>                
                    </div>

                    <div>
                        <h2 className="text-[18px] font-semibold text-[#7C3AED] leading-none">
                            VaxTrack
                        </h2>

                        <p className="mt-1 text-[10px] uppercase text-gray-500">
                            Medical Administration
                        </p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-3">
                <SidebarMenu className="space-y-2">
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={item.isActive}
                                className={`h-11 rounded-xl px-3 text-[15px] font-medium transition-all ${item.isActive ? "bg-[#E9DDFF] text-[#7C3AED] hover:bg-[#E9DDFF]" : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}>
                                <button>
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.title}</span>
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

                <div className="flex-1" />
                <div className="px-1 pb-6 pt-10">
                    <button className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#7C3AED] text-sm font-medium text-white shadow-sm transition hover:bg-[#6D28D9]">
                        <GoPlusCircle className="h-4 w-4" />
                        Add Record
                    </button>
                </div>
            </SidebarContent>

            <SidebarFooter className="px-3 pb-6">
                <SidebarMenu className="space-y-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="h-11 rounded-xl px-3 text-gray-600 hover:bg-gray-100"
                        >
                            <button>
                                <Settings className="h-5 w-5" />
                                <span>Settings</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="h-11 rounded-xl px-3 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                            <button>
                                <LogOut className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}