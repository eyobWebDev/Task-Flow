import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useThemeStore } from "@/store/useThemeStore"
import { LogIn, MoonStar, Sun } from "lucide-react"

export default function NavBar() {
    const {darkMode, toggleDarkMode} = useThemeStore()

    const handleDarkMode = () => {
        toggleDarkMode()
    }

    return <>
        <div className={`${darkMode ? "navbar-container-dark" : "navbar-container-light"} flex justify-between p-5 items-center w-full`}>
            <div className="lg:text-4xl md:text-3xl  navbar-title font-bold">TaskFlow</div>

            <div className="flex gap-4">
                <NavLink className={`navbar-link hover:text-blue-500`}>Home</NavLink>
                <NavLink className={`navbar-link hover:text-blue-500`}>About</NavLink>
                <NavLink className={`navbar-link hover:text-blue-500`}>Settings</NavLink>
                <div onClick={handleDarkMode} className={`navbar-link p-2 rounded ${darkMode ? "hover:bg-gray-600": "hover:bg-gray-300"}`}>{darkMode ? <Sun/> : <MoonStar />}</div>
                <NavLink className={`hover:text-blue-500`}><Button variant={`outline`} className={`hover:bg-blue-200`}>Log In</Button></NavLink>
            </div>
        </div>
    </>
}