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

    return <div onClick={() => setSelectedTask(task)} className="flex hover:cursor-pointer shadow-xl text-blue-200 flex-col rounded-xl p-3 gap-2 bg-base-300 hover:bg-base-200">

        {/* header */}
        <div>
            <div className="flex items-center justify-between">
                <PriorityIndicator priority={task.priority || ""} />
                <Edit size={15} />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox checked={task.status == 'done'} className={`scale-80`} /> 
                <div className="hover:cursor-pointer flex items-center gap-2">
                    <div>{task.title}</div>
                    <Badge className={`scale-75`} variant={`outline`}>{task.status}</Badge>
                </div>
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
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><User size={12} /> John </div>
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><Clock3Icon size={12} /> {FormatDateShort(task.dueDate) || "no due date"} </div>
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><MessageCircleMore size={12} /> {task.comments.length} </div>
            <a href="#task-detail-drawer-attachment" className="flex items-center opacity-70 hover:opacity-95 gap-1"><Paperclip size={12} /> {task.attachments.length} </a>
        </div>
    </div>
}