import NavBar from "@/layouts/base/NavBar";
import "../assets/styles/home_page.css"
import { Button } from "@/components/ui/button";
import { ArrowRight, ChartLineIcon, FolderClosed, Handshake, MessageCircleMore, Workflow } from "lucide-react";
import { primary } from "@/assets/styles/colors";
import Footer from "@/layouts/base/Footer";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
    const navigate = useNavigate()


    return <>
     
     <div className="w-[100%] relative home-page h-[100vh]">
        <NavBar />
        <div className="lg:pl-70 lg:pr-70 p-5 flex flex-col gap-6">
            <div className="flex-col gap-5 mt-15 flex">
            <div className="lg:text-6xl text-4xl opacity-95 font-bold">TaskFlow</div>
            <div className="lg:text-3xl text-2xl opacity-75 font-bold">Full Project & Team Management System</div>
            <div className="lg:text-[20px] text-[10px] opacity-65 mt-3">A productivity tool for teams with: Boards (Trello-style), Team collaboration, Real-time updates, Messaging (like Slack), Permissions & roles, Task assignment & tracking, Notifications.</div>
            </div>

            <div>
                <Button onClick={() => navigate("/auth/login")} className={`w-30 mt-5 p-7  scale-btn cursor-pointer cta-btn bg-[${primary}]`}>Get started <ArrowRight /></Button>
            </div>
        </div>

        
     </div>

     <div className="p-4">
        <div className="text-5xl font-bold text-center mt-20 mb-20 text-gradient">Features</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="feature-card-element shadow bg-base-300">
                <div className="feature-card-header"><FolderClosed />   <div>Workspace</div></div>
                <div className="feature-card-description">Create/join workspaces, Inside workspace: multiple projects.</div>
            </div>
            <div className="feature-card-element shadow bg-base-300">
                <div className="feature-card-header"><Workflow />   <div>Task</div></div>
                <div className="feature-card-description">Assign to team members, Due dates, priority tags, checklists.</div>
            </div>
            <div className="feature-card-element shadow bg-base-300">
                <div className="feature-card-header"><Handshake />   <div>Team Collaboration</div></div>
                <div className="feature-card-description"> Comment on tasks, @mention team members, Attach files/images, Drag & drop.</div>
            </div>
            <div className="feature-card-element shadow bg-base-300">
                <div className="feature-card-header"><ChartLineIcon />   <div>Analytics Dashboard</div></div>
                <div className="feature-card-description"> Task progress (Done/In Progress/Backlog), Team performance (tasks completed per member), Charts and data visualizations.</div>
            </div>
            <div className="feature-card-element shadow bg-base-300">
                <div className="feature-card-header"><MessageCircleMore />   <div>In App messaging</div></div>
                <div className="feature-card-description"> Direct messaging between team members, Group chat by project, Typing indicator, seen messages.</div>
            </div>
            
        </div>


     </div>

     <Footer />
    </>
}