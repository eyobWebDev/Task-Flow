import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import CustomMenuBar from "@/widget/CustomMenuBar";
import StackedAvatar from "@/widget/feature/StackedAvatar";
import PriorityIndicator from "@/widget/PriorityIndicator";
import StatusBadge from "@/widget/StatusBadge";
import { Activity, ArrowUp, CheckSquare, ChevronDown, Clock, Copy, EditIcon, FileCodeIcon, MessageCircleMore, MoveUpRight, Paperclip, Plus, Rows4, Trash, Trash2, UserPen, X } from "lucide-react";
import { useEffect, useState } from "react";
import TaskDetailDescriptionTextarea from "./TaskDetailDescriptionTextarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@radix-ui/react-progress";
import TipTapEditor from "@/utils/TipTapEditor";
import SubtaskCard from "@/widget/feature/SubtaskCard";
import PinnedFileCard from "@/widget/PinnedFileCard";
import { Button } from "@/components/ui/button";
import CommentCard from "../comments/CommentCard";
import { useTaskStore } from "@/store/useTaskStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useNavigate } from "react-router-dom";


export default function TaskDetailDrawer({trigger}){
    const {selectedTask, deleteTask, changeStatus, changePriority} = useTaskStore()
    const {selectedProject} = useProjectStore()
    const navigate = useNavigate()
    console.log("selected task", selectedTask);
    const [open, setOpen] = useState(false)
    const [priority, setPriority] = useState(selectedTask?.priority)
    const [status, setStatus] = useState({status: selectedTask?.status, color: "green"})
    const [dueDate, setDueDate] = useState(selectedTask?.dueDate)

    useEffect(() => {
        setPriority(selectedTask?.priority)
        setStatus({status: selectedTask?.status, color: "green"})
        setDueDate(selectedTask?.dueDate)
    }, [selectedTask])

    const handleDrafts = () => {
        console.log("draft");
    }


    return <Drawer direction='right' open={open} onOpenChange={setOpen}>
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent className={`lg:min-w-2/3 p-4 h-full text-blue-100 lg:rounded-l-2xl rounded-l-xl min-w-11/12 bg-light-100`} forceMount>
        <ScrollArea className={`h-[100vh] overflow-x-scroll`}>

            <DrawerHeader className={`sticky top-0 z-10 bg-light-100`}>
                <div className={`flex items-center justify-between`}>
                    <DrawerTitle className={`flex items-center font-bold gap-3 text-2xl`}>
                        <Checkbox onClick={async () => 
                                selectedTask?.status == "done" ? await changeStatus({taskId: selectedTask._id, status: "in-progress"}) : await changeStatus({taskId: selectedTask._id, status: "done"})
                        } checked={selectedTask?.status == "done"} /> 
                            {selectedTask?.title}
                    </DrawerTitle>
                    <div className="flex items-center gap-3">
                        {/* <Button>Save changes</Button> */}
                        <DrawerClose><X className="p-1 tras-bg-hover" /></DrawerClose>
                    </div>
                </div>
            </DrawerHeader>

            <div className="flex flex-col gap-5 lg:p-4 p-1">

                {/* meta data */}
                <div className="flex text-sm items-center mb-5 flex-wrap justify-around gap-4 ">
                    {/* assignee view*/}
                    <div className="flex flex-col gap-1">
                        <CustomMenuBar 
                        trigger={<div className="text-[10px] flex items-center gap-2 opacity-70">Assignee <ChevronDown size={15} /></div>} 
                        itemsList={[
                            
                            selectedProject.members.filter(member => member.userId._id != selectedTask?.assignee._id).map(member => {
                                return {
                                title: <div className="flex items-center gap-2"><StackedAvatar size={`small`} avatars={[{src: member.userId.profilePic, alt: member.userId.username[0]}]} />{member.userId.username}</div>,
                                subs: [{name: <div className="flex items-center gap-2 text-xs"><Trash2 size={10} />Delete</div>}] 
                            }
                            }) 
                        ]}
                        />
                        
                        <div className="flex items-center gap-3">
                            <StackedAvatar size={`small`} avatars={[{src: selectedTask?.assignee.profilePic, alt: selectedTask?.assignee.username[0]}]} />
                            <div>{selectedTask?.assignee.username}</div>
                        </div>
                    </div>

                    {/* priority */}
                    <div className="flex flex-col gap-1">
                        <CustomMenuBar 
                        trigger={<div className="text-[10px] flex items-center gap-2 opacity-70">Priority <ChevronDown size={15} /></div>}
                        itemsList={[
                            [
                                {title: "High", callback: async () => {setPriority("high")
                                await changePriority({taskId: selectedTask._id, priority: "high"})}},
                                {title: "Medium", callback: async () => {setPriority("medium")
                                await changePriority({taskId: selectedTask._id, priority: "medium"})
                                }},
                                {title: "Low", callback: async () => {setPriority('low')
                                await changePriority({taskId: selectedTask._id, priority: "low"})    
                                }}
                            ]
                        ]}
                        />
                        <PriorityIndicator priority={priority} />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-1">
                        <CustomMenuBar 
                        trigger={<div className="text-[10px] flex items-center gap-2 opacity-70">Status <ChevronDown size={15} /></div>}
                        itemsList={[
                            [
                                {title: "To do", callback: async () => {setStatus({status: "todo", color: "green"})
                                await changeStatus({taskId: selectedTask._id, status: "todo"})}},
                                {title: "In Progress", callback: async () => {setStatus({status: "in-progress ", color: "blue"})
                                await changeStatus({taskId: selectedTask._id, status: "in-progress"})
                                }},
                                {title: "Done", callback: async () => {setStatus({status: "done", color: "gray"})
                                await changeStatus({taskId: selectedTask._id, status: "done"})    
                                }},
                                {title: "Review", callback: async () => {setStatus({status: "review", color: "yellow"})
                                await changeStatus({taskId: selectedTask._id, status: "review"})
                                }},
                            ]
                        ]}
                        />
                        <StatusBadge status={status.status} color={status.color} />
                    </div>
                </div>

                {/* Description Textarea */}
                <div className="flex flex-col gap-3">
                    <div className="gap-4 flex text-sm items-center "><Rows4 size={15} />Description</div>
                    <div className="p-4">
                        <TipTapEditor />
                    </div>
                </div>

                {/* due date */}
                <div className="flex flex-col gap-1">
                    <div className="text-[10px] opacity-70">Due Date</div>
                    <div className="flex items-center gap-4">
                        <input className="input-sm input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" />
                    </div>
                </div>
                

                {/* Subtask section */}
                <div className="flex flex-col mb-3 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="gap-4 flex font-semibold text-sm items-center "><CheckSquare size={15} />Subtask</div>
                        <div className="flex gap-2 w-full items-center">20/42 20%</div>
                    </div>

                    {selectedTask?.subtasks.length > 0 ? <div className="p-4 flex items-center gap-3">
                        {
                            selectedTask.subtasks.map(subtask => {
                                return <SubtaskCard />
                            })
                        }
                    </div> : <div className="flex flex-col text-xs gap-2">
                        <div>No Sub tasks yet</div>
                        <Button className={`btn btn-sm w-30`}>Add subtask</Button>
                        </div>}
                </div>

                {/* Attachment section */}
                <div id="task-detail-drawer-attachment" className="flex flex-col mb-4 gap-3">
                    <div className="flex items-center gap-5">
                        <div className="gap-4 flex text-sm font-semibold items-center "><Paperclip size={15} />Attachments</div>
                        <div className="font-semibold text-sm flex gap-2 items-center p-2 hover:cursor-pointer rounded tras-bg-hover"><Plus size={15} /> Upload File </div>
                    </div>
                    
                    {selectedTask?.attachments.length > 0 ? <div className="p-4 flex items-center gap-3">
                        <PinnedFileCard icon={<FileCodeIcon size={15} />} fileName={'Job board'} fileType={`HTML`} user={`John`} createdAt={`sep 12`} count={`12`} />
                    </div> : "No attachment on this task!"}
                </div>

                {/* comment and activity section*/}
                <div className="flex lg:flex-nowrap flex-wrap justify-between mb-5 gap-4">
                    {/* comment section */}
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <div className="gap-4 flex text-sm items-center "><MessageCircleMore size={15} />Comments</div>
                        </div>
                        
                        <ScrollArea >
                        <div className="flex h-100 border-2 border-gray-600 justify-between flex-col relative bg-base-200 rounded w-full gap-4">
                            <div className="p-4 flex flex-col gap-3">
                                <div className="text-[10px] text-muted">use @mention to tag someone your comment.</div>

                                {selectedTask?.comments.length > 0 ? 
                                selectedTask.comments.map(comment => {
                                    return <CommentCard user={`John`} comment={`This is shit`} createdAt={`12:01 pm`} /> 
                                })
                                : "No comments yet!"}
                            </div>

                            <form className="stick flex items-center p-2 bottom-0">
                                <input className="input w-full input-sm focus:outline-none" placeholder="Write your comment..." />
                                <Button type='submit' className={`btn-outline btn-sm`} variant={`outline`}><ArrowUp size={15} /></Button>
                            </form>
                        </div>
                        </ScrollArea>
                    </div>

                    {/* Activity section */}
                     <div className="flex w-full flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <div className="gap-4 flex text-sm items-center "><Activity size={15} />Recent Activities</div>
                        </div>
                        
                        <ScrollArea className="flex relative border-2 border-gray-600 flex-col bg-base-200 rounded w-full h-100 gap-4">
                            <div className="p-4 flex flex-col  gap-3">
                                <div className="text-muted text-[10px] sticky top-0 p-2 bg-base-200">Here are all the recent activities</div>

                                {selectedTask?.activity.length > 0 ? 
                                selectedTask.activity.map(act => {
                                    return <div className="border text-xs break-words rounded p-2 border-gray-600 pl-3">{act.message}</div>
                                })  
                                : "No activities"}

                            </div>
                        </ScrollArea>
                    </div>
                </div>

                {/* small commands */}
                <div className="flex text-xs flex-wrap justify-between mb-5 gap-3">
                    <div onClick={async () => selectedTask.status == "done" ? await changeStatus({taskId: selectedTask._id, status: "in-progress"}) : await changeStatus({taskId: selectedTask._id, status: "done"})} 

                    className="flex items-center opacity-70 tras-bg-hover p-1.5 rounded hover:opacity-95 gap-3">
                        <Checkbox checked={selectedTask?.status == "done"} id="MarkDone" className={`scale-75`} /> <label htmlFor="MarkDone">Mark as done</label> </div>

                    <div className="flex items-center opacity-70 tras-bg-hover p-1.5 rounded hover:opacity-95 gap-3"><Copy size={12} /> Duplicate </div>
                    <div className="flex items-center opacity-70 tras-bg-hover p-1.5 rounded hover:opacity-95 gap-3"><MoveUpRight size={12} /> Move </div>

                    <div onClick={async () => {
                        await deleteTask({taskId: selectedTask?._id, projectId: selectedProject._id})
                        setOpen(false)
                    }} className="flex items-center opacity-70 tras-bg-hover text-red-500 p-1.5 rounded hover:opacity-95 gap-3"><Trash2 size={12} /> Delete </div>
                </div>

            </div>   
                      
        </ScrollArea>
        </DrawerContent>
    </Drawer>
}