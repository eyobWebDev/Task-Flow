import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MembersListView from "@/features/workspace/MembersListView";
import ProjectsListView from "@/features/project/ProjectsListView";
import RecentActivitiesListView from "@/features/workspace/RecentActivitiesListView";
import { useAuthStore } from "@/store/useAuthStore";
import { Routes, Route, NavLink } from "react-router-dom";
import WorkspaceLeftMenuBar from "@/features/workspace/WorkspaceLeftMenuBar";
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
import "../assets/styles/home_page.css"
import { navbarStyle } from "@/assets/styles/fetaure_style";
import CreateTaskDialog from "@/features/task/CreateTaskDialog";
import InviteMemberDialog from "@/features/team/InviteMemberDialog";


export default function ProjectDashBoardPage(){
    const {authUser}= useAuthStore()
    const {getProjects, selectedProject, invitations} = useProjectStore()
    const {selectedWorkspace} = useWorkspaceStore()

    useEffect(() => {
        getProjects()
    }, [selectedWorkspace])

    return <div className="h-screen relative home-page flex w-full">
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