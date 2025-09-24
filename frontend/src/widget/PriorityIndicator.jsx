import { useEffect, useState } from "react"


export default function PriorityIndicator({priority}){
    

    return <div className="flex items-center tras-bg p-1 rounded gap-2">
        <div className={`h-3 w-3 ${priority.toLowerCase() == "high" && "bg-red-500"} ${priority.toLowerCase() == "medium" && "bg-yellow-500"} ${priority.toLowerCase() == "low" && "bg-green-500"} rounded-full`}></div>
        <div className="text-[10px] font-bold">{priority}</div>
    </div>
}