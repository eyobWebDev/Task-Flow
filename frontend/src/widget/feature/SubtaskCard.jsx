import { Checkbox } from "@/components/ui/checkbox";
import StackedAvatar from "./StackedAvatar";
import { Clock } from "lucide-react";
import { useState } from "react";


export default function SubtaskCard(){

    return <div className="flex flex-col gap-4 p-3 border border-gray-700 rounded bg-base-300">
        <div className="flex text-sm items-center gap-2">
            <Checkbox className={`scale-80`} /> Title
        </div>

        <div>
            <StackedAvatar size={`small`} avatars={[{alt: "J"}, {alt: "A"}, {alt: "E"}, {alt: "T"}, {alt: "U"}]} />
        </div>

        <div className="flex items-center gap-2 text-xs">
            <Clock size={12} /> sep 12
        </div>
    </div>
}