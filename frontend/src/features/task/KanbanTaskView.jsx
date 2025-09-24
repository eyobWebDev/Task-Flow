import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useProjectStore } from "@/store/useProjectStore";
import KanbanTaskCard from "@/widget/feature/KanbanTaskCard";
import PriorityIndicator from "@/widget/PriorityIndicator";
import { CheckCircle2, CircleCheck, Clock3Icon, Edit, ListTodo, MessageCircleMore, MoreHorizontal, Paperclip, Timer, TimerIcon, User } from "lucide-react";
import TaskDetailDrawer from "./TaskDetailDrawer";


export default function KanbanTaskView(){
    const {selectedProject} = useProjectStore()
    const todoList = selectedProject.tasks.filter(task => task.status == "todo")
    const inProgressList = selectedProject.tasks.filter(task => task.status == "in-progress")
    const doneList = selectedProject.tasks.filter(task => task.status == "done")

    return <div className="lg:grid-cols-3 p-3  grid gap-5 grid-cols-1">
        {/* Todo list */}
        <div className="flex flex-col p-2 min-h-full rounded bg-light-100 ">
            <div className="flex items-center justify-between  p-2">
                <div className="flex text-blue-600 font-bold items-center text-sm gap-3"><ListTodo size={15} /><div>To Do</div></div>
                <div><MoreHorizontal /></div>
            </div>

            {/* list container where all children reside */}
            <div className="flex p-2  flex-col gap-4">
                {todoList.length > 0 ? todoList.map(task => {
                    return <TaskDetailDrawer trigger={<KanbanTaskCard task={task} />} />
                }): <div className="text-blue-200 text-center text-xs">No task to do!</div>}
                
            </div>

        </div>

        {/* In progres list */}
        <div className="flex flex-col p-2 min-h-full rounded bg-light-100 ">
            <div className="flex items-center justify-between  p-2">
                <div className="flex text-yellow-600 font-bold items-center text-sm gap-3"><Timer size={15} /><div>In Progress</div></div>
                <div><MoreHorizontal /></div>
            </div>

            {/* list container where all children reside */}
            <div className="flex p-2  flex-col gap-3">
                {inProgressList.length > 0 ? inProgressList.map(task => {
                    return <TaskDetailDrawer trigger={<KanbanTaskCard task={task} />} />
                }): <div className="text-blue-200 text-center text-xs">No task in progress!</div>}
            </div>
            
        </div>

        {/* Done list */}
        <div className="flex flex-col p-2 min-h-full rounded bg-light-100 ">
            <div className="flex items-center justify-between  p-2">
                <div className="flex text-green-600 font-bold items-center text-sm gap-3"><CheckCircle2 size={15} /><div>Done</div></div>
                <div><MoreHorizontal /></div>
            </div>

            {/* list container where all children reside */}
            <div className="flex p-2  flex-col gap-3">
                {doneList.length > 0 ? doneList.map(task => {
                    return <TaskDetailDrawer trigger={<KanbanTaskCard task={task} />} />
                }): <div className="text-blue-200 text-center text-xs">No task Done!</div>}
            </div>
            
        </div>

    </div>
}