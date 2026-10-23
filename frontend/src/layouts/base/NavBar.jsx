import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useThemeStore } from "@/store/useThemeStore"
import { LogIn, MenuIcon, MoonStar, Sun } from "lucide-react"
import { navbarStyle } from "@/assets/styles/fetaure_style"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function NavBar() {
    const {darkMode, toggleDarkMode} = useThemeStore()

    const handleDarkMode = () => {
        toggleDarkMode()
    }

    return <>
        <div className={`${navbarStyle} fixed top-0 left-0 z-20 flex justify-between p-3 items-center w-full`}>
            <div className="lg:text-4xl md:text-3xl  navbar-title font-bold">TaskFlow</div>

            <div className="flex items-center gap-3">
                <div onClick={handleDarkMode} className={`navbar-link p-3 rounded ${darkMode ? "hover:bg-gray-600": "hover:bg-gray-300"}`}>{darkMode ? <Sun/> : <MoonStar />}</div>
                <NavLink to={"/auth/login"} className={` hover:text-blue-500`}>
                    <button className={`btn btn-sm btn-wide`}>Log In</button></NavLink>
            </div>
        </div>
    </>
}