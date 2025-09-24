import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import CustomMenuBar from "@/widget/CustomMenuBar";
import { Bell, ChevronDown, ChevronRight, Filter, HomeIcon, Menu, MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";



export default function WorkspaceNavBar({rightElement}){
        const {authUser}= useAuthStore()
        const {selectedWorkspace} = useWorkspaceStore()
        const {selectedProject} = useProjectStore()

    return <><div className="pl-3 sticky top-0 bg-base-100 p-1 z-20 pr-3 right-0 flex items-center justify-between">

        <NavLink to={`/workspace/${selectedWorkspace?._id}/projects`} className="flex hover:cursor-pointer h-10 items-center gap-2">
            <Menu className={`lg:hidden bg-transparent p-1 md:hidden flex`} />
            <HomeIcon size={20} className="text-orange-200 p-1 rounded bg-orange-600" />

            <div className="text-light-300 flex gap-1 items-center text-sm">
                <div>{authUser.username}'s Workspace</div> <ChevronRight size={20} /> 
                <div>{selectedWorkspace && selectedWorkspace.name || "Workspace Name"}</div><ChevronRight size={20} />
                <div>{selectedProject != null && selectedProject?.name || ""}</div>
            </div>

        </NavLink>

        {rightElement}
    </div></>
}