import { Clock3Icon, Edit, MessageCircleMore, Paperclip, User } from "lucide-react";
import PriorityIndicator from "../PriorityIndicator";
import { Checkbox } from "@/components/ui/checkbox";
import { useTaskStore } from "@/store/useTaskStore";
import { FormatDate, FormatDateShort } from "@/utils/FormatDate";


export default function KanbanTaskCard({task}){
    const {setSelectedTask} = useTaskStore()

    return <div onClick={() => setSelectedTask(task)} className={`flex border-l-3  text-blue-200 hover:cursor-pointer hover:bg-base-100 bg-base-200 flex-col shadow-2xl p-2 rounded gap-1 ${task?.priority.toLowerCase() == "high" && "border-l-red-500"} ${task?.priority.toLowerCase() == "medium" && "border-l-yellow-500"} ${task?.priority.toLowerCase() == "low" && "border-l-green-500"}`}>
        
        <div className="flex justify-between items-center">
            <PriorityIndicator priority={task?.priority || `High`} />
            <Edit size={15} />
        </div>

        {/* primary info */}
        <div className="flex justify-between items-center">
            <div className="flex items-center text-sm gap-2">
                <Checkbox checked={task.status == "done"} className={`scale-80`} />
                <div>{task?.title || "Title"}</div>
            </div>
        </div>

        {/* Secondary info */}
        {task.subtasks.length > 0 ? <div className="flex gap-2 text-xs opacity-70 items-center">
            1/5 subtask <li>Backend</li>
        </div>: <div className="text-left text-xs">
            <div>No subtask!</div>
            </div>}

        {/* Meta data */}
        <div className="flex text-xs justify-between mt-3 gap-3">
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><User size={12} /> {task.assignee.username} </div>
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><Clock3Icon size={12} /> {FormatDateShort(task.dueDate) || "no due date"} </div>
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><MessageCircleMore size={12} /> {task.comments.length} </div>
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><Paperclip size={12} /> {task.attachments.length} </div>
        </div>
        
    </div>
}