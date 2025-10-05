import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import ProjectBox from "@/widget/feature/ProjectBox";
import StackedAvatar from "@/widget/feature/StackedAvatar";
import { FolderOpen, MoreHorizontal } from "lucide-react";
import CreateProjectDialog from "./CreateProjectDialog";
import { Button } from "@/components/ui/button";
import SpinAnimate from "@/widget/SpinAnimate";


export default function ProjectsListView(){
    const {projects, isGettingProject} = useProjectStore()

    console.log("projects", projects);
    if(isGettingProject){
        return <SpinAnimate text={`Getting all the projects...`} />
    }

    return <div className="lg:pl-8 lg:pt-5 pt-2 grid lg:grid-cols-2 grid-cols-1 lg:pr-10 pl-2 gap-5 pr-2">
        {/* <ProjectBox project={{username: "username", description: "Descriton - detailed descriptiom.", 
        members: [{username: "John"}, {username: "Jane"}, {username: "Dow"}], role: "Admin" }} /> */}
        

        {projects.length > 0 ?
            projects.map(project => {
                return <ProjectBox project={project} />
            }) : <div className="w-full flex flex-col gap-2 items-center">
                <div>No project in this Workspace!</div>
                <CreateProjectDialog trigger={<Button>Create New Project</Button>} />

            </div>
        }

    </div>
}