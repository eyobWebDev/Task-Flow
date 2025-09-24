import { Button } from "@/components/ui/button";
import CreateTaskDialog from "@/features/task/CreateTaskDialog";
import KanbanTaskView from "@/features/task/KanbanTaskView";
import TaskListView from "@/features/task/TaskListView";
import { useProjectStore } from "@/store/useProjectStore";
import CustomMenuBar from "@/widget/CustomMenuBar";
import { ChevronDown, Grid, KanbanIcon, ListCheckIcon } from "lucide-react";
import { useState } from "react";


export default function TasksTab(){
    const [isActive, setIsActive] = useState("list")
    const {selectedProject} = useProjectStore()

    return <div>
        <div className="flex mt-3 items-center justify-between">
            <div className="flex gap-3 items-center text-sm text-muted">
                <div onClick={() => setIsActive("list")} className={`flex hover:cursor-pointer items-center gap-2 p-1 rounded pl-2 pr-2 ${isActive == "list" ? "bg-light-100 text-white" : "bg-light-200"}`}><ListCheckIcon size={15} /><div>List</div></div>
                <div onClick={() => setIsActive("kanban")} className={`flex hover:cursor-pointer items-center gap-2 p-1 rounded pl-2 pr-2 ${isActive == "kanban" ? "bg-light-100 text-white" : "bg-light-200"}`}><KanbanIcon size={15} /><div>Kanban</div></div>
            </div>
            <div className="flex items-center gap-3">
                <CustomMenuBar 
            trigger={<div className="p-1 text-muted flex gap-1 items-center rounded text-sm tras-bg-hover">
                <div>Sort By</div>
                <ChevronDown size={20} />
            </div>}
            itemsList={[
                [
                    {title: "Last Updated"},
                    {title: "Name"},
                    {title: "Progress"},
                    {title: "Deadline"},
                ]
            ]}
            content_style={"bg-light-100"}
            />
            
            <CustomMenuBar 
            trigger={<div className="p-1 text-muted flex gap-1 items-center rounded text-sm tras-bg-hover">
                <div>Filter By</div>
                <ChevronDown size={20} />
            </div>}

            itemsList={[
                [
                    {title: "Status", subs: [{name: "Active"}, {name: "On Hold"}, {name: "Completed"}]},
                    {title: "Visibility", subs: [{name: "Public"}, {name: "Private"}]},
                    {title: "Tags", subs: [{name: "#UI"}]},
                ]
                
            ]}
            content_style={"bg-light-100"}
            />
            </div>
        </div>


        {selectedProject.tasks.length > 0 ? (isActive == "list" ? <TaskListView /> : <KanbanTaskView />) : 
            <div className="p-10 text-blue-200 gap-3 flex flex-col items-center">
                <div>No Task to view!</div>
                <CreateTaskDialog trigger={<Button variant={`outline`}>Create Task</Button>} />

            </div>
        }
    </div>
}