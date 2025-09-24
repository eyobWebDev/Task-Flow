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

export default function ProjectDetailHeader(){
    const [active, setActive] = useState("overview")

    return <div className="lg:pl-7 lg:pt-2 p-3">
        
        <Tabs value={active} onValueChange={setActive} defaultValue="overview">
           <div className="sticky lg:min-h-10 min-h-20 z-10 bg-base-100 top-12 flex flex-col lg:gap-5 gap-2"> 
                <TabsList className={`flex w-full flex-wrap justify-between`}>
                    <div className="flex flex-wrap items-center lg:gap-5 gap-1">
                        <TabsTrigger className={`p-1 lg:scale-100 scale-80 rounded hover:cursor-pointer tras-bg pl-2 pr-2 ${active == "overview" && "text-blue-500 border-b-2 border-b-blue-500" }`} value="overview">Overview</TabsTrigger>
                        <TabsTrigger className={`p-1 lg:scale-100 scale-70 rounded hover:cursor-pointer tras-bg pl-2 pr-2 ${active == "tasks" && "text-blue-500 border-b-2 border-b-blue-500" }`} value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger className={`p-1 lg:scale-100 scale-80 rounded hover:cursor-pointer tras-bg pl-2 pr-2 ${active == "milestones" && "text-blue-500 border-b-2 border-b-blue-500" }`} value="milestones">Milestones</TabsTrigger>
                        <TabsTrigger className={`p-1 lg:scale-100 scale-80 rounded hover:cursor-pointer tras-bg pl-2 pr-2 ${active == "members" && "text-blue-500 border-b-2 border-b-blue-500" }`} value="members">Members</TabsTrigger>
                        <TabsTrigger className={`p-1  rounded hover:cursor-pointer tras-bg pl-2 pr-2 ${active == "settings" && "text-blue-500 border-b-2 border-b-blue-500" }`} value="settings">Settings</TabsTrigger>
                    </div>

                    <div className="lg:flex md:flex hidden text-sm items-center ">
                        <CreateTaskDialog trigger={<Button className={`text-sm scale-80 tras-bg-hover btn-outline`} variant={`outline`}>+ Add Task</Button>} />
                        <InviteMemberDialog trigger={<Button className={`text-sm scale-80 tras-bg-hover btn-outline`} variant={`outline`}>Invite Members</Button>} />
                    </div>

                </TabsList>
           </div>

            <ScrollArea className={`h-[100vh] p-1`}>
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