import CustomBadge from "@/widget/feature/CustomBadge";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OverviewTab from "./tabs/OverviewTab";
import TasksTab from "./tabs/TasksTab";
import MilestonesTab from "./tabs/MilestonesTab";
import SettingsTab from "./tabs/SettingsTab";
import { ScrollArea } from "@/components/ui/scroll-area";
import InviteMemberDialog from "../team/InviteMemberDialog";
import MembersTab from "./tabs/MembersTab";
import CreateTaskDialog from "../task/CreateTaskDialog";
import WorkspaceNavBar from "@/layouts/feature/WorkspaceNavBar";
import { NavLink } from "react-router-dom";
import { Bell } from "lucide-react";
import CustomDot from "@/widget/CustomDot";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export default function ProjectDetailHeader(){
    const [active, setActive] = useState("overview")
    const {authUser}= useAuthStore()
    const {getProjects, selectedProject, invitations} = useProjectStore()
    const {selectedWorkspace} = useWorkspaceStore()
    const tabTriggerStyle = "lg:text-sm md:text-sm text-xs border-r-2 border-b-0 border-r-white/30 text-white/70  rounded-none hover:cursor-pointer pl-2 pr-2"
    const activeTabTriggerStyle = "border-t-2 border-t-blue-500 text-blue-100 tras-bg"

    return <div className="">
        
        <Tabs value={active} onValueChange={setActive} defaultValue="overview">

            {/* Header for the detail project page */}
            <div className="sticky bg-base-200 z-10 top-0 flex flex-col gap-5 drop-shadow-2xl"> 
                {/* contains the workspace navbar */}
                <div className="">
                    <WorkspaceNavBar rightElement={
                        <div className="flex items-center gap-2">
                            <NavLink to={`/workspace/${selectedWorkspace?._id}/projects/invitations`} className="relative p-1 rounded bg-light-400-hover"><Bell size={20} className="" /> 
                                {invitations.length > 0 && <CustomDot content={invitations.filter(invite => invite.status == "pending" && invite.username == authUser.username).length} />} 
                            </NavLink>
                            <div className="lg:flex hidden text-sm items-center ">
                                <CreateTaskDialog trigger={<Button className={`text-sm scale-80 tras-bg-hover btn-outline`} variant={`outline`}>+ Add Task</Button>} />
                                <InviteMemberDialog trigger={<Button className={`text-sm scale-80 tras-bg-hover btn-outline`} variant={`outline`}>Invite Members</Button>} />
                            </div>
                        </div>
                    } />
                </div>

                {/* all the tab links */}
                <TabsList className={`grid w-full grid-cols-5`}>
                    <TabsTrigger className={`${tabTriggerStyle} ${active == "overview" && activeTabTriggerStyle}`} value="overview">Overview</TabsTrigger>
                    <TabsTrigger className={`${tabTriggerStyle} ${active == "tasks" && activeTabTriggerStyle}`}  value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger className={`${tabTriggerStyle} ${active == "milestones" && activeTabTriggerStyle}`}  value="milestones">Milestones</TabsTrigger>
                    <TabsTrigger className={`${tabTriggerStyle} ${active == "members" && activeTabTriggerStyle}`}  value="members">Members</TabsTrigger>
                    <TabsTrigger className={`${tabTriggerStyle} ${active == "settings" && activeTabTriggerStyle}`}  value="settings">Settings</TabsTrigger>
                </TabsList>
            </div>

            <ScrollArea className={`h-[100vh] lg:pl-4 lg:pt-2 p-1`}>
                <TabsContent value="overview">
                    <OverviewTab />
                </TabsContent>
                <TabsContent value="tasks">
                    <TasksTab />
                </TabsContent>
                <TabsContent value="milestones">
                    <MilestonesTab />
                </TabsContent>
                <TabsContent value="members">
                    <MembersTab />
                </TabsContent>
                <TabsContent value="settings">
                    <SettingsTab />
                </TabsContent>
            </ScrollArea>
        </Tabs>

    </div>
}