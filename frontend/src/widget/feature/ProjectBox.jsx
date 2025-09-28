import { Progress } from "@/components/ui/progress";
import StackedAvatar from "./StackedAvatar";
import { ArchiveIcon, ArrowUpRightFromSquare, Edit2, FolderOpen, MoreHorizontal, Pin, Trash2 } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CustomMenuBar from "../CustomMenuBar";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import DeleteConsentDialog from "./DeleteConsentDialog";
import { FormatDateRelative } from "@/utils/FormatDate";
import { useOpenComponentStore } from "@/store/useOpenComponentStore";
import EditProjectDrawer from "@/features/project/EditProjectDrawer";


export default function ProjectBox({project}) {
    const {setSelectedProject, deleteProject, selectedProject} = useProjectStore()
    const {setOpenDeleteDialogConsentBox, setOpenEditProjectDrawer} = useOpenComponentStore()
    const [value, setValue] = useState(20)
    const navigate = useNavigate()
    const {updateLastActive} = useAuthStore()
    const {authUser} = useAuthStore()
    const user = project.members.find(member => member.userId.username == authUser.username)

    console.log(project);
    
    
    
    return<div className="h-80 hover:cursor-pointer shadow bg-light-100 p-2 justify-between flex flex-col rounded-xl">

            {/* top and middle */}
            <div>
                {/* top section */}
                <div className="flex justify-between p-3 font-bold">
                    <div className="flex items-center gap-4">
                        <FolderOpen size={20} />
                        <div>{project.name}</div>
                    </div>
                    <CustomMenuBar 
                    trigger={<MoreHorizontal />}
                    itemsList={[
                    [
                        {title: "Edit project", shortcut: <Edit2 />, callback: () => {
                            setSelectedProject(project)
                            setOpenEditProjectDrawer(true)
                            console.log("from project box",selectedProject.name)
                        }},
                        {title: "Pin Project", shortcut: <Pin />},
                        {title: "Delete Project", shortcut: <Trash2 />, callback: () => setOpenDeleteDialogConsentBox(true)},
                    ]
                    ]}
                    />
                </div>

                {/* dialog and drawers*/}
                <DeleteConsentDialog trigger={""} name={project.name}  />

                {/*  middle section */}
                <div className="p-3 text-sm flex flex-col gap-2 text-light-200">
                    <div>{project.description}</div>
                    <div className="flex gap-4 items-center">Progress <Progress value={value} /> {value}%</div>
                    <div className="flex gap-4 items-center">Status <Badge variant={`outline`}>{project.status}</Badge></div>
                    {project.milestone && <div>Next - {project.milestone || ""}</div>}
                    {project.dueDate && <div>Due date - {project.dueDate}</div>}
                    <div>Last Updated: {FormatDateRelative(project.updatedAt)}</div>
                </div>
           </div>

            {/* Bottom section */}
            <div className="flex justify-between">
                <div className="flex items-center gap-3">           
                    {project.members  && <><div className="flex items-center gap-3"><div>
                        <StackedAvatar avatars={
                        project.members.slice(0, 3).map((member, i) => {  
                            if(member.userId) return { src: "", alt: member.userId.username[0].toUpperCase() || "" };
                        })
                    } /></div>{project.members?.length > 3 && <div>+{project.members?.length-3} more.</div>}</div> </>}
                    <div>
                      You :  <Badge className={``} variant={`outline`}>{user.role}</Badge>
                    </div>
                </div>

                <Button onClick={async () => {
        navigate(`${project?._id}`)
        setSelectedProject(project)
        await updateLastActive({projectId: project._id})
    }} className={`flex gap-3 btn items-center`}>Open <ArrowUpRightFromSquare /></Button>
            </div>
    </div>
}