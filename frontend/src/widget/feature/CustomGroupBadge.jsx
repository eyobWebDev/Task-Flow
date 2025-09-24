import { Grid, Rows3Icon } from "lucide-react"
import { useState } from "react"
import CustomBadge from "./CustomBadge"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"


export default function CustomGroupBadge({badges}){
    const [currentBadge, setCurrentBadge] = useState("")
    const {currentBadge : cb, setCurrentBadge : scb} = useWorkspaceStore()

    return <div className="flex gap-3">
        {badges && 
        badges.map((badge, i) => {
            return <CustomBadge icon={badge.icon} title={badge.title} currentBadge={currentBadge == badge.title} 
            callback={() => {
                setCurrentBadge(badge.title)
                scb(badge.title)
            }} />
        })
        }
    </div>
}