import { FiBell } from "react-icons/fi"

import { SidebarTrigger } from "./sidebar"

import VaxTrackLogoPurple from "../svgImages/VaxTrackLogoPurple"

import { IoSettingsOutline } from "react-icons/io5"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

import { useDispatch, useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"

import axios from "axios"

import { logout } from "@/redux/slices/authSlice"

import { toast } from "react-toastify"

import type { RootState } from "@/redux/stores/store"

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
    path: "/admin/staff-management",
  },

  {
    label: "Reports",
    path: "/admin/reports",
  },
]

const Navbar = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { token, user } = useSelector((state: RootState) => state.auth)

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
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(logout())

      navigate("/login")

      toast.success("Logged out successfully")
    }
  }

  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center border-b bg-sidebar px-3">
      {user?.role !== "GUARDIAN" && (
        <div className="flex-1 md:hidden">
          <SidebarTrigger />
        </div>
      )}

      <div className="flex flex-1 justify-start">
        <div className="flex items-center gap-2">
          <VaxTrackLogoPurple />

          <h1 className="text-[20px] font-extrabold text-[#7C3AED]">
            VaxTrack
          </h1>
        </div>
      </div>

      <div className="hidden lg:block">
        <ul className="flex gap-5 text-[14px] text-[#57534E]">
          {navItems
            .filter((item) => {
              if (
                (item.label === "Staff Management" ||
                  item.label === "Reports") &&
                user?.role !== "ADMIN"
              ) {
                return false
              } else if (
                item.label === "My Dependents" &&
                user?.role !== "GUARDIAN"
              ) {
                return false
              }

              return true
            })
            .map((item) => (
              <li
                key={item.path}
                className="cursor-pointer transition-colors hover:text-[#7C3AED]"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-end gap-6">
        <div
          className="relative"
          onClick={() => navigate(`/${user?.role.toLowerCase()}/notifications`)}
        >
          <FiBell className="cursor-pointer" />

          <div className="absolute top-0 right-0 size-1.5 rounded-full bg-red-600" />
        </div>

        <IoSettingsOutline className="cursor-pointer" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              className="size-7 cursor-pointer rounded-full object-cover"
              src={user?.imageUrl || "https://i.pravatar.cc/"}
              alt="Profile"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
