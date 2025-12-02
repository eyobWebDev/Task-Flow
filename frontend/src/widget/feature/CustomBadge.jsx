import { useState } from "react"


export default function CustomBadge({icon, title, callback, currentBadge}){
    const [touch, setTouch] = useState(false)

    return <div onClick={callback} className={`bg-light-200 hover:cursor-pointer justify-center md:p-1 md:pl-2 md:pr-3
    ${currentBadge ? "text-light-100 bg-light-300" : "text-light-300" } flex gap-4 items-center lg:p-1 rounded lg:pl-2 lg:pr-3 pl-1 pr-2 h-7 lg:h-8 drop-shadow-2xl`}>
        {icon}
        {title && <div className="lg:text-sm md:text-sm text-xs flex justify-center items-center font-bold">{title || ""}</div>}
    </div>
}