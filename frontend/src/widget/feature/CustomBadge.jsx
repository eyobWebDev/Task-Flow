import { useState } from "react"


export default function CustomBadge({icon, title, callback, currentBadge}){
    const [touch, setTouch] = useState(false)

    return <div onClick={callback} className={`bg-light-200 hover:cursor-pointer justify-center ${currentBadge ? "text-light-100" : "text-light-300" } flex gap-3 items-center p-1 rounded-2xl pl-2 pr-3`}>
        {icon}
        {title && <div className="text-sm flex justify-center items-center font-bold">{title || ""}</div>}
    </div>
}