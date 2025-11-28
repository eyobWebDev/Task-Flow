import { Checkbox } from "@/components/ui/checkbox";
import UserStatus from "../UserStatus";
import { Badge } from "@/components/ui/badge";
import PriorityIndicator from "../PriorityIndicator";
import { ArrowUpRightFromSquareIcon, Clock3Icon, Edit, MessageCircleMore, Paperclip, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import StackedAvatar from "./StackedAvatar";
import { useTaskStore } from "@/store/useTaskStore";
import { FormatDateShort } from "@/utils/FormatDate";


export default function TaskListCard({task}){
    const {setSelectedTask} = useTaskStore()

    return <div onClick={() => setSelectedTask(task)} 
    className="flex hover:cursor-pointer shadow-xl flex-col rounded p-2 gap-2 bg-base-300 hover:bg-base-200">

        {/* header */}
        <div className="flex p-2 rounded bg-light-150 justify-between">
            <div className="flex flex-col gap-2">
                <div className="font-bold text-sm">{task.title}</div>
            </div>
            
            <Edit size={15} />
        </div>

        <div className="flex gap-3">
            <div className="bg-light-150 p-1 text-xs font-semibold flex gap-2 items-center rounded">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div>{task.priority || ""}</div>
            </div>
            <div className="bg-light-150 p-1 text-xs font-semibold flex gap-2 items-center rounded">
                <div className=""></div>
                <div>{task.status || ""}</div>
            </div>  
        </div>


        {/* Body */}
        <div className="opacity-70 text-sm flex-col gap-2 flex">
            <div className="text-left">{task.description}</div>
            {task.subtasks.length > 0 && <div className=" flex gap-1.5">1/4 subtask <li>Backend</li></div>}
            <div>
                <StackedAvatar size={`small`} avatars={[{alt: "J"}]} />
            </div>
        </div>

        {/* Meta data */}
        <div className="flex text-xs justify-between mt-3 gap-3">
            <div className="flex bg-light-200 p-1 rounded items-center opacity-70 hover:opacity-95 gap-1">
                <User size={12} /> John </div>
            <div className="flex bg-light-200 p-1 rounded items-center opacity-70 hover:opacity-95 gap-1"><Clock3Icon size={12} /> {FormatDateShort(task.dueDate) || "no due date"} </div>
            <div className="flex bg-light-200 p-1 rounded items-center opacity-70 hover:opacity-95 gap-1"><MessageCircleMore size={12} /> {task.comments.length} </div>
            <a href="#task-detail-drawer-attachment" className="flex bg-light-200 p-1 rounded items-center opacity-70 hover:opacity-95 gap-1"><Paperclip size={12} /> {task.attachments.length} </a>
        </div>
    </div>
}