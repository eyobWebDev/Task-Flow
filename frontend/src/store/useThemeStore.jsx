import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
    darkMode: document.documentElement.getAttribute("data-theme") == "dark",

    toggleDarkMode: () => {
        console.log('toggling');
        
        if(get().darkMode){
            document.documentElement.setAttribute("data-theme", "light")
            set({darkMode: false})  
        } else {
            set({darkMode: true})
            document.documentElement.setAttribute("data-theme", "dark")
        }
    },
}))