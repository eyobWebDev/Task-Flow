import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MembersListView from "@/features/workspace/MembersListView";
import ProjectsListView from "@/features/project/ProjectsListView";
import RecentActivitiesListView from "@/features/workspace/RecentActivitiesListView";
import { useAuthStore } from "@/store/useAuthStore";
import { Routes, Route, NavLink } from "react-router-dom";
import WorkspaceLeftMenuBar from "@/features/workspace/WorkSpaceLeftMenuBar";
import WorkspaceNavBar from "@/layouts/feature/WorkspaceNavBar";
import ProjectHeader from "@/layouts/feature/ProjectHeader";
import WorkspaceNavbarRightElement from "@/features/workspace/WorkspaceNavbarRightElement";
import ProjectDetailPage from "@/features/project/ProjectDetailPage";
import ProjectDetailHeader from "@/features/project/ProjectDetailHeader";
import ProjectHeaderRightElement from "@/features/project/ProjectHeaderRightElement";
import { useEffect } from "react";
import { useProjectStore } from "@/store/useProjectStore";
import GeneralSettings from "@/features/auth/MyProfile";
import MyProfile from "@/features/auth/MyProfile";
import InvitationsListView from "@/features/team/InvitationsListView";
import { Bell } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import CustomDot from "@/widget/CustomDot";



export default function ProjectDashBoardPage(){
    const {authUser}= useAuthStore()
    const {getProjects, selectedProject, invitations} = useProjectStore()
    const {selectedWorkspace} = useWorkspaceStore()

    useEffect(() => {
        getProjects()
    }, [])

    return <div className="h-screen flex w-full">
        <WorkspaceLeftMenuBar />
        

        
        <div className="lg:w-3/4 w-full overflow-y-auto h-[100vh]">
            

            <Routes>
                <Route index element={<>
                    <ScrollArea className={`h-[100vh]`}>
                        <WorkspaceNavBar rightElement={<WorkspaceNavbarRightElement />} />
                        <ProjectHeader />
                        <ProjectsListView />
                    </ScrollArea>
                    </> } />
                
                <Route path="/:projectId" element={<ScrollArea className={`h-[100vh] w-full`}>
                    <WorkspaceNavBar rightElement={
                        <div className="flex items-center gap-2">
                            <NavLink to={`/workspace/${selectedWorkspace._id}/projects/invitations`} className="relative p-1 rounded bg-light-400-hover"><Bell size={20} className="" /> 
                                {invitations.length > 0 && <CustomDot content={invitations.filter(invite => invite.status == "pending" && invite.username == authUser.username).length} />} 
                            </NavLink>
                        </div>
                    } />
                    <ProjectDetailHeader />
                    <ProjectDetailPage />
                </ScrollArea>} />

                <Route path="/members" element={<ScrollArea className={`h-[100vh]`}>
                    <WorkspaceNavBar />
                    <MembersListView />
                </ScrollArea>} />

                <Route path="/activities" element={<ScrollArea className={`h-[100vh]`}>
                    <WorkspaceNavBar />
                    <RecentActivitiesListView />
                </ScrollArea>} />

                <Route path="/my-profile" element={<ScrollArea className={`h-[100vh]`}>
                    <WorkspaceNavBar />
                    <MyProfile />
                </ScrollArea>} />

                <Route path="/invitations" element={<ScrollArea className={`h-[100vh]`}>
                    <WorkspaceNavBar />
                    <InvitationsListView />
                </ScrollArea>} />

            </Routes>       
        </div>

    </div>
}