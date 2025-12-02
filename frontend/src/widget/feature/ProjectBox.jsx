import { Progress } from "@/components/ui/progress";
import StackedAvatar from "./StackedAvatar";
import { ArchiveIcon, ArchiveRestore, ArchiveXIcon, ArrowUpRightFromSquare, CalendarClock, Edit2, FileClock, FolderOpen, Heart, Milestone, MilestoneIcon, MoreHorizontal, Pin, Trash2, User, Users } from "lucide-react";
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
import { callOrReturn } from "@tiptap/core";


export default function ProjectBox({project}) {
    const {setSelectedProject, archiveProject, favouriteProject} = useProjectStore()
    const {setOpenDeleteDialogConsentBox, setOpenEditProjectDrawer} = useOpenComponentStore()
    const [value, setValue] = useState(20)
    const navigate = useNavigate()
    const {updateLastActive} = useAuthStore()
    const {authUser} = useAuthStore()
    const user = project.members.find(member => member.userId.username == authUser.username)
    const [progWidth, setprogWidth] = useState(`w-${value}`)
    const statusStyle = project.status == "active" ? "bg-green-500" : project.status == "on-Hold" ? "bg-orange-500" : project.status == "completed" ? "bg-blue-500" : "bg-gray-500"
    
    
    
    return<div className="min-h-85 shadow-lg bg-base-300 p-2.5 justify-between flex flex-col rounded-xl">

           <div className="flex flex-col gap-2">
                {/* top section */}
                <div className="flex flex-col gap-2">
                    <div className="flex bg-base-100 rounded-lg justify-between p-3">
                        <div className="flex flex-col gap-2">
                            <div className="flex font-bold items-center gap-3">
                                <FolderOpen size={20} />
                                <div>{project.name}</div>
                            </div>
                            <div className="opacity-80 text-xs">{project.description}</div>
                        </div>

                        <CustomMenuBar 
                        trigger={<MoreHorizontal />}
                        itemsList={[
                        [
                            {title: "Edit project", shortcut: <Edit2 />, callback: () => {
                                setSelectedProject(project)
                                setOpenEditProjectDrawer(true)
                            }},
                            {title: "Favourite Project", shortcut: <Heart />, callback: () => favouriteProject(project)},
                            {title: project.status == "archive" ? "UnArchive project" : "Archive Project", 
                                shortcut: project.status == "archive" ? <ArchiveRestore /> : <ArchiveXIcon />, callback: () => archiveProject({project, status: "archive"})},
                        ]
                        ]}
                        />
                    </div>

                    {/* info grid */}
                    <div className="flex justify-between opacity-80 gap-3">
                        {/* status */}
                        <div className="p-1.5 bg-light-200 rounded ">
                            <div className="flex items-center justify-center gap-2">
                                <div className={`w-3 h-3 ${statusStyle} rounded-full`}></div>
                                <div className="text-xs font-semibold">{project.status}</div>
                            </div>
                        </div>

                        {/* Due date */}
                        <div className="p-1.5 bg-light-200 drop-shadow-xs rounded drop-shadow-gray-700">
                            <div className="flex items-center justify-center gap-2">
                                <div className=""><CalendarClock size={15} /></div>
                                <div className="text-xs font-semibold">{project.dueDate ? <div>{project.dueDate}</div> : "No due date!"}</div>
                            </div>
                        </div>

                        {/* Updated at */}
                        <div className="p-1.5 bg-light-200 drop-shadow-xs rounded drop-shadow-gray-700">
                            <div className="flex items-center justify-center gap-2">
                                <div className=""><FileClock size={15} /></div>
                                <div className="text-xs font-semibold"><div>{FormatDateRelative(project.updatedAt)}</div></div>
                            </div>
                        </div>  
                    </div>
                </div>
                

                {/* dialog and drawers*/}
                <DeleteConsentDialog trigger={""} name={project.name}  />

                {/*  middle section */}
                <div className="flex flex-col gap-3">
                    {/* display next milestone */}
                    <div className="p-2 w-full drop-shadow-xl pl-3 flex flex-col gap-2 rounded bg-base-100">
                        <div className="flex opacity-80 items-center gap-2">
                            <MilestoneIcon size={15} />
                            <div className="text-xs">Next milestone</div>
                        </div>

                        <div className="p-1 pl-5 rounded bg-light-200 text-sm">
                            {project.milestones.length > 0 ? <li className="">{project.milestones[0].title || ""}</li> : "No Milestone!"}
                        </div>
                    </div>

                    {/* progress */}
                    <div className="flex gap-4 items-center">
                        <div className="w-100 h-4 flex justify-start items-center p-2 drop-shadow-2xl bg-light-150 rounded-2xl">
                            <div className={`${progWidth} bg-light-300 h-2 rounded-2xl`}></div>
                        </div>
                        {value}%
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div className="flex items-center gap-2">

                {/* members and role */}
                <div className="flex w-2/3 items-center gap-3">
                    <div className="flex w-1/2 font-semibold p-1 bg-light-200 justify-start rounded pl-2 text-xs items-center gap-2">
                        <Users size={15}/>           
                        <div className="">
                            {project.members  && <><div className="flex items-center gap-3"><div>
                                <StackedAvatar size={`small`} avatars={
                                project.members.slice(0, 3).map((member, i) => {  
                                    if(member.userId) return { src: "", alt: member.userId.username[0].toUpperCase() || "" };
                                })
                            } /></div>{project.members?.length > 3 && <div>+{project.members?.length-3} more.</div>}</div> </>}
                        </div>
                    </div>

                    <div className="flex w-1/2 font-semibold p-2 bg-light-200 justify-center rounded pl-2 text-xs items-center gap-2">           
                        <User size={15} />
                        <div className="">{user.role}</div>
                    </div>
                </div>

                <Button onClick={async () => {
                    navigate(`${project?._id}`)
                    setSelectedProject(project)
                    await updateLastActive({projectId: project._id})
                }} className={`flex gap-3 w-1/3 btn btn-active items-center`}>Open <ArrowUpRightFromSquare /></Button>
            </div>
           
    </div>
}