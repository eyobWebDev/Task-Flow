import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/store/useProjectStore";
import { Atom, BicepsFlexedIcon, StopCircle } from "lucide-react";


export default function ProjectHeader(){
    const {projects} = useProjectStore()
    const activeProjects = projects?.length > 0 && projects.filter(project => project.status == "active")
    const onHoldProjects = projects?.length > 0 && projects.filter(project => project.status == "on-hold")
    const completedProjects = projects?.length > 0 && projects.filter(project => project.status == "completed")
    
    

    return <div className="flex lg:p-4 p-2 sticky top-10 bg-base-100 z-10 flex-col gap-3">
        <div className=" flex justify-between">
            {/* subtitle  */}
            <div className="text-sm text-muted">
                All Projects in this Workspaces
            </div>
        </div>

        {projects.length > 0 && <div className="flex text-sm text-muted gap-3">
            <div > <Badge variant={`info`} className="flex gap-2"><Atom size={20} className="text-blue-500" />Active - {activeProjects?.length}</Badge></div>
            <div > <Badge variant={`info`} className="flex gap-2"><StopCircle size={20} className="text-orange-500" />On Hold - {onHoldProjects.length}</Badge></div>
            <div><Badge variant={`info`} className="flex gap-2"><BicepsFlexedIcon size={20} className="text-green-500" />Completed - {completedProjects.length}</Badge></div>
        </div>}
    </div>
}