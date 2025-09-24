import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import CustomDot from "@/widget/CustomDot";
import CustomMenuBar from "@/widget/CustomMenuBar";
import CustomTooltip from "@/widget/CustomTooltip";
import { Bell, ChevronDown, MoreHorizontal } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import CreateProjectDialog from "../project/CreateProjectDialog";
import { useAuthStore } from "@/store/useAuthStore";


export default function WorkspaceNavbarRightElement(){
    const {selectedWorkspace} = useWorkspaceStore()
    const {authUser} = useAuthStore()
    const navigate = useNavigate()

    return <div className="h-10 lg:flex md:flex hidden items-center gap-4">
            
            <CustomMenuBar 
            trigger={<div className="p-1 text-muted flex gap-1 items-center rounded text-sm tras-bg-hover">
                <div>Sort By</div>
                <ChevronDown size={20} />
            </div>}

            itemsList={[
                [
                    {title: "Last Updated"},
                    {title: "Name"},
                    {title: "Progress"},
                    {title: "Deadline"},
                ]
            ]}
            content_style={"bg-light-100"}

            />
            
            <CustomMenuBar 
            trigger={<div className="p-1 text-muted flex gap-1 items-center rounded text-sm tras-bg-hover">
                <div>Filter By</div>
                <ChevronDown size={20} />
            </div>}

            itemsList={[
                [
                    {title: "Status", subs: [{name: "Active"}, {name: "On Hold"}, {name: "Completed"}]},
                    {title: "Visibility", subs: [{name: "Public"}, {name: "Private"}]},
                    {title: "Tags", subs: [{name: "#UI"}]},
                ]
                
            ]}
            content_style={"bg-light-100"}
            />
            <NavLink to={`invitations`} className="relative p-1 rounded bg-light-400-hover">
                <Bell size={20} className="" />
                {authUser.invitations.length > 0 && <CustomDot content={authUser.invitations.filter(invite => invite.status == "pending" && invite.username == authUser.username).length} />}
            </NavLink>
            <MoreHorizontal size={25} className="p-1 rounded bg-light-400-hover" />
            <CreateProjectDialog trigger={<Button className={`btn btn-sm`}>+ Create new project</Button>} />
        </div>
}