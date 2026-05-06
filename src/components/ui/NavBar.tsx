import { FiBell } from "react-icons/fi";
import { SidebarTrigger } from "./sidebar";
import VaxTrackLogoPurple from "../svgImages/VaxTrackLogoPurple";
import { IoSettingsOutline } from "react-icons/io5";


const Navbar = () => {
    return (
        <nav className="flex bg-sidebar px-3 sticky top-0 z-50 h-12 items-center">
            <div className="md:hidden flex-1">
                <SidebarTrigger />
            </div>
            <div className="flex flex-1 justify-start">
                <div className="flex items-center gap-2">
                    <VaxTrackLogoPurple />
                    <h1 className="font-extrabold text-[20px] text-[#7C3AED] ">VaxTrack</h1>
                </div>
            </div>
            <div className="">
                <ul className="flex gap-5 text-[14px] text-[#57534E]">
                    <li>My Dashboard</li>
                    <li>My Dependents</li>
                    <li>Vaccinations</li>
                    <li>Staff Management</li>
                    <li>Reports</li>
                </ul>
            </div>
            <div className="flex items-center justify-end flex-1 gap-6">
                <div className="relative">
                    <FiBell className="hover:cursor-pointer" />
                    <div className="size-1.5 rounded-full bg-red-600 absolute top-0 right-0"></div>
                </div>
                <IoSettingsOutline className="hover:cursor-pointer" />
                <img className="size-7 rounded-full" src="https://i.pravatar.cc/" />
            </div>
        </nav>
    )
}

export default Navbar