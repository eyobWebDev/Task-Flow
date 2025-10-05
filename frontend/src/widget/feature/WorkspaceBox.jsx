import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRightFromSquareIcon, CircleArrowOutUpRightIcon, Edit2, Edit3, FolderOpen, HomeIcon, MoreHorizontal, ProjectorIcon, Settings, UsersIcon, Workflow } from "lucide-react";
import CustomMenuBar from "../CustomMenuBar";
import StackedAvatar from "./StackedAvatar";
import { Badge } from "@/components/ui/badge";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";


export default function WorkspaceBox({workspace}){
    const {setSelectedWorkspace} = useWorkspaceStore()
    const {updateLastActive} = useAuthStore()
    const {getWorkspaceProjects} = useProjectStore()
    const navigate = useNavigate()

    const handleClick = async () => {
        setSelectedWorkspace(workspace)
        getWorkspaceProjects(workspace._id)
        navigate(`/workspace/${workspace._id}/projects`)
        await updateLastActive({workspaceId: workspace._id})
    }

    return <><div onClick={handleClick} className="bg-light-300 flex flex-col justify-between rounded-2xl h-70 text-light-200">
        <div className="flex flex-col p-4 gap-2">
            <div className="flex justify-between">

                {/* name and logo */}
                <div className="flex items-center gap-3">
                    <HomeIcon size={20} className="text-orange-200 p-1 rounded bg-orange-600" />
                    <div className="lg:text-2xl hover:cursor-pointer text-xl font-bold text">
                        {workspace.name}
                    </div>
                </div>

                {/*custom menu bar*/}
                <div>
                    <CustomMenuBar
                        trigger={<MoreHorizontal />}
                        itemsList={[
                            [
                                { title: "Invite mebers", shortcut: <UsersIcon /> },
                                { title: "New project", shortcut: <ProjectorIcon /> },
                                { title: "Leave workspace", shortcut: <ArrowUpRightFromSquareIcon /> },
                                { title: "Settings", shortcut: <Settings /> },
                            ]
                        ]} />
                </div>
            </div>

            {/* avatar badges */}
            <div>
                
                {workspace.members.length > 0 && <><div className="flex items-center gap-3"><div>
                    <StackedAvatar avatars={
                    workspace.members.slice(0, 3).map((member, i) => {   
                        return { src: member.user.profilePic || "", alt: member.user.username[0].toUpperCase() || "" };
                    })
                } /></div>{workspace.members.length > 3 && <div>+{workspace.members.length-3} more.</div>}</div> </>}

            </div>

            {/* quick stats */}
            <div className="flex flex-col p-2">
                <div className="text-sm text-muted">Quick stats </div>
                <div className="flex flex-col p-2 gap-1">
                    <div className="flex gap-2 items-center"><FolderOpen size={20} /><div>Projects count - {workspace.projects?.length || 0}</div></div>
                    
                </div>
            </div>

        </div>

        {/* User role badge */}
        <div className="bg-light-200 text-light-200 flex items-center justify-between p-2 rounded-b-2xl">
            <div className="text-sm">
                <Badge variant={`outline`}>Admin</Badge>
            </div>
            <Button className={`p-1 hover:cursor-pointer flex gap-3 items-center`}>Detail <ArrowRight /></Button>
        </div>

    </div>
    </>
}