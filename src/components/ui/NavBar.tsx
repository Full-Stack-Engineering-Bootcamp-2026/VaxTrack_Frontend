import { FiBell } from "react-icons/fi";
import { SidebarTrigger } from "./sidebar";
import VaxTrackLogoPurple from "../svgImages/VaxTrackLogoPurple";
import { IoSettingsOutline } from "react-icons/io5";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import type { RootState } from "@/redux/stores/store";

const navItems = [
    {
        label: "My Dashboard",
        path: "/guardian/dashboard",
    },
    {
        label: "My Dependents",
        path: "/guardian/dependents",
    },
    {
        label: "Vaccinations",
        path: "/guardian/vaccinations",
    },
    {
        label: "Staff Management",
        path: "/guardian/staff",
    },
    {
        label: "Reports",
        path: "/guardian/reports",
    },
]
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, user } = useSelector(
        (state: RootState) =>
            state.auth
    );
    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/users/logout",
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            dispatch(logout());
            toast.success("Logged out successfully");
            navigate("/login");

        } catch (error) {
            toast.error("Logout failed");
            console.error(error);
        }
    };
    return (
        <nav className="flex bg-sidebar px-3 sticky top-0  h-12 items-center border-b">
            {user?.role !== "GUARDIAN" &&
                <div className="md:hidden flex-1">
                    <SidebarTrigger />
                </div>
            }
            <div className="flex flex-1 justify-start">
                <div className="flex items-center gap-2">
                    <VaxTrackLogoPurple />
                    <h1 className="font-extrabold text-[20px] text-[#7C3AED] ">VaxTrack</h1>
                </div>
            </div>
            <div className="hidden lg:block">
                <ul className="flex gap-5 text-[14px] text-[#57534E]">
                    {navItems
                        .filter((item) => {
                            // hide admin-only routes
                            if (
                                (item.label === "Staff Management" ||
                                    item.label === "Reports") &&
                                user?.role !== "ADMIN"
                            ) {
                                return false
                            }

                            return true
                        })
                        .map((item) => (
                            <li
                                key={item.path}
                                className="cursor-pointer hover:text-[#7C3AED] transition-colors"
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="flex items-center justify-end flex-1 gap-6">
                <div className="relative" onClick={()=>navigate("/guardian/notifications")}>
                    <FiBell className="hover:cursor-pointer" />
                    <div className="size-1.5 rounded-full bg-red-600 absolute top-0 right-0"></div>
                </div>
                <IoSettingsOutline className="hover:cursor-pointer" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                        <img
                            className="size-7 rounded-full cursor-pointer"
                            src="https://i.pravatar.cc/"
                        />

                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer"
                        >
                            Logout
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>
            </div>
        </nav>
    )
}

export default Navbar