import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
    BarChart3,
    BellRing,
    ClipboardList,
    LayoutGrid,
    LogOut,
    Settings,
    Users,
} from "lucide-react"

import { GoPlusCircle } from "react-icons/go"

import VaxTrackLogo from "./svgImages/VaxTrackLogo"

import { NavLink, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import type { RootState } from "@/redux/stores/store"

import { logout } from "@/redux/slices/authSlice"

import axios from "axios"

const menuItems = [

    {
        title: "My Dashboard",
        icon: LayoutGrid,
        adminPath: "/admin/dashboard",
        staffPath: "/staff/dashboard",
    },

    {
        title: "Vaccinations",
        icon: ClipboardList,
        adminPath: "/admin/vaccines",
        staffPath: "/staff/vaccines",
    },
    {
        title: "Overdue Overview",
        icon: BellRing,
        adminPath: "/admin/overdue",
        staffPath: "/staff/overdue",
    },
    {
        title: "Staff Management",
        icon: Users,
        adminPath: "/admin/staff-management",
        staffPath: "/staff/staff-management",
    },

    {
        title: "Reports",
        icon: BarChart3,
        adminPath: "/admin/reports",
        staffPath: "/staff/reports",
    },
]

export function AppSidebar() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { user, token } = useSelector(
        (state: RootState) => state.auth
    )

    const isAdmin = user?.role === "ADMIN"

    const handleLogout = async () => {

        try {
            await axios.post(
                "http://localhost:3000/api/users/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        }
        catch (error) {
            console.error(error)
        }
        finally {
            dispatch(logout())
            navigate("/login")
        }
    }

    return (
        <Sidebar>

            <SidebarHeader className="px-5 pt-6 pb-8">

                <div className="flex items-center gap-3">

                    <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#7C3AED] text-white font-bold shadow-sm">

                        <VaxTrackLogo />
                    </div>

                    <div>

                        <h2 className="text-[18px] font-semibold leading-none text-[#7C3AED]">
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

                    {menuItems
                        .filter((item) => {

                            if (
                                item.title === "Staff Management" &&
                                user?.role !== "ADMIN"
                            ) {
                                return false
                            }

                            return true
                        })
                        .map((item) => {

                            const path =
                                isAdmin
                                    ? item.adminPath
                                    : item.staffPath

                            return (

                                <SidebarMenuItem key={item.title}>

                                    <NavLink to={path}>

                                        {({ isActive }) => (

                                            <SidebarMenuButton
                                                className={`h-11 w-full rounded-xl px-3 text-[15px] font-medium transition-all ${isActive
                                                        ? "bg-[#E9DDFF] text-[#7C3AED]"
                                                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                                                    }`}
                                            >

                                                <item.icon className="h-5 w-5" />

                                                <span>
                                                    {item.title}
                                                </span>

                                            </SidebarMenuButton>
                                        )}

                                    </NavLink>

                                </SidebarMenuItem>
                            )
                        })}
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

                                <span>
                                    Settings
                                </span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            asChild
                            className="h-11 rounded-xl px-3 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >

                            <button onClick={handleLogout}>

                                <LogOut className="h-5 w-5" />

                                <span>
                                    Logout
                                </span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}