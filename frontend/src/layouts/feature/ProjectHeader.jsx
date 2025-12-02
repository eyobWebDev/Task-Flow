import { navbarStyle } from "@/assets/styles/fetaure_style";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/store/useProjectStore";
import { Atom, BicepsFlexedIcon, StopCircle } from "lucide-react";


export default function ProjectHeader(){
    const {projects} = useProjectStore()
    const activeProjects = projects?.length > 0 && projects.filter(project => project.status == "active")
    const onHoldProjects = projects?.length > 0 && projects.filter(project => project.status == "on-Hold")
    const completedProjects = projects?.length > 0 && projects.filter(project => project.status == "completed")
    
    

    return <div className={`flex lg:p-4 p-2 sticky ${navbarStyle} top-10 z-10 flex-col gap-3`}>
        <div className=" flex justify-between">
            {/* subtitle  */}
            <div className="text-sm opacity-90">
                All Projects in this Workspaces
            </div>
        </div>

        {projects.length > 0 && <div className="flex text-sm text-muted gap-3">
            <div className="flex items-center gap-2 rounded bg-light-100 p-1"> 
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <div className="text-xs text-white/80 font-semibold">Active - {activeProjects?.length}</div>
            </div>
            <div className="flex items-center gap-2 rounded bg-light-100 p-1"> 
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="text-xs text-white/80 font-semibold">On Hold - {onHoldProjects.length}</div>
            </div>
            <div className="flex items-center gap-2 rounded bg-light-100 p-1"> 
                <div className="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
                <div className="text-xs text-white/80 font-semibold">Completed - {completedProjects.length}</div>
            </div>
        </div>}
    </div>
}