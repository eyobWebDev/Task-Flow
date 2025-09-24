import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardLeftMenuBarComponent from "@/layouts/feature/DashboardLeftMenuBarComponent";
import LeftbarWsCollapsible from "@/layouts/feature/LeftbarWsCollapsible";
import { useAuthStore } from "@/store/useAuthStore";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import CircleProfileBadge from "@/widget/CircleProfileBadge";
import CustomCollapsible from "@/widget/CustomCollapsible";
import CustomTooltip from "@/widget/CustomTooltip";
import CustomBadge from "@/widget/feature/CustomBadge";
import { ActivitySquareIcon, ArrowDownWideNarrowIcon, ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Clock, Edit, Flag, Folder, FolderCheck, Heart, Home, icons, Inbox, LampDeskIcon, Menu, PaintBucket, PenSquareIcon, Pin, Plus, Projector, Search, Settings, User, UserCheck, UsersIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectDialog from "../project/CreateProjectDialog";
import { useOpenComponentStore } from "@/store/useOpenComponentStore";
import InviteMemberDialog from "../team/InviteMemberDialog";

export default function WorkspaceLeftMenuBar(){
    const {authUser} = useAuthStore()
    const {selectedWorkspace} = useWorkspaceStore()
    const {setOpenInviteMemberDialog, openInviteMemberDialog} = useOpenComponentStore()
    const [isOpen, setIsOpen] = useState(false)
    const [wsOpen, setWsOpen] = useState(false)
    const navigate = useNavigate()


    return <>
    <ScrollArea className="lg:flex md:flex hidden flex-col gap-4 bg-light-100 w-1/4 p-2">
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col gap-2">

            {/* header to show the workspace name etc */}
            <div className="flex z-10 w-full sticky top-0 bg-light-100 p-2 items-center justify-between">
                <CollapsibleTrigger className="flex hover:cursor-pointer items-center gap-2">
                    <CircleProfileBadge url={authUser.profilePic} fallback={authUser.username[0]} />
                    <div className="text-sm text-light-100">
                        {authUser.username}'s Workspace
                    </div>
                    <div>
                        {isOpen ? <ChevronUp size={20} className="text-light-300" /> : <ChevronDown size={20} className="text-light-300" />}
                    </div>
                </CollapsibleTrigger>

                <CreateProjectDialog trigger={<CustomTooltip trigger={<PenSquareIcon size={20} className="text-light-300 hover:cursor-pointer" />} text={"Create New Project"} />} />
            </div>

            <CollapsibleContent className="p-2 text-sm flex flex-col gap-2 text-light-300">
                <LeftbarWsCollapsible />
                
                <div className="flex hover:cursor-pointer items-center gap-4">
                    <Search size={15} /><div>Search</div>
                </div>
                <div className="flex hover:cursor-pointer items-center gap-4">
                    <Home size={15} /><div>Home</div>
                </div>
                <div className="flex hover:cursor-pointer items-center gap-4">
                    <Inbox size={15} /><div>Inbox</div>
                </div>
            </CollapsibleContent>
        </Collapsible>

        {/* Private section */}
        <DashboardLeftMenuBarComponent
            title={"Private"}
            elements={[
                {
                    icon: <CreateProjectDialog trigger={<div className="flex hover:cursor-pointer items-center gap-3"><Plus size={15} /> Add New</div>} /> ,
                    text: ""
                },
            ]} />

        {/* Teamspace section */}
        <DashboardLeftMenuBarComponent
            title={`Teamspace`}
            elements={[
                {
                    icon: <ActivitySquareIcon size={15} className="text-red-500" />,
                    text: "Recent Activities",
                    route: "activities"

                },
                {
                    icon: <Flag size={15} className="text-blue-500" />,
                    text: "Goal Tracker"
                },
                {
                    icon: <Projector size={15} className="text-green-500" />,
                    text: "Projects",
                    route: ""
                },
                {
                    icon: <UsersIcon size={15} className="text-orange-500" />,
                    text: "Members",
                    route: "members"
                },
            ]} />
        

        {/* Project collapsible */}
        <div className="p-3 flex flex-col gap-3">
            <div className="text-[10px] text-muted">Projects</div>

            {/* Recent projects collapsible */}
            <CustomCollapsible 
            trigger={<div className="flex items-center gap-2">
                <Clock className="text-blue-500" size={15} /><div>Recent Projects</div>
            </div>}
            items={[
                {name: "Redising website", icon: <PaintBucket className="text-purple-500" size={15} />}
            ]}
            />

            {/* favourite projects collapsible */}
            <CustomCollapsible 
            trigger={<div className="flex items-center gap-2">
                <Heart className="text-red-500" size={15} /><div>Favourite Projects</div>
            </div>}
            items={[
                {name: "Redising website", icon: <PaintBucket className="text-purple-500" size={15} />}
            ]}
            />

            {/* Pinned projects collapsible */}
            <CustomCollapsible 
            trigger={<div className="flex items-center gap-2">
                <Pin className="text-yellow-500" size={15} /><div>Pinned Projects</div>
            </div>}
            items={[
                {name: "Redising website", icon: <PaintBucket className="text-purple-500" size={15} />}
            ]}
            />
        </div>
            
        <hr className="text-light-500" />

        {/* Bottom bar section */}
        <DashboardLeftMenuBarComponent
            elements={[
                {
                    icon: <UserCheck size={15} className="" />,
                    text: "invite Member",
                    callback: () => {
                        setOpenInviteMemberDialog(true)
                        console.log(openInviteMemberDialog);
                        
                    }
                },
                {
                    icon: <ArrowLeft size={15} className="" />,
                    text: "Back to Workspace Dashboard",
                    route: "/workspace"
                },
                {
                    icon: <Edit size={15} className="" />,
                    text: "Edit workspace",
                },
                {
                    icon: <User size={15} className="" />,
                    text: "My Profile",
                    route: "my-profile"
                }
            ]} />

        <InviteMemberDialog title={`Workspace`}  />
    </ScrollArea>
    </>

}