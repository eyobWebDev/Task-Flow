import TaskListCard from "@/widget/feature/TaskListCard";
import TaskBox from "@/widget/feature/TaskListCard";
import TaskDetailDrawer from "./TaskDetailDrawer";
import { useProjectStore } from "@/store/useProjectStore";
import { useTaskStore } from "@/store/useTaskStore";


export default function TaskListView(){
    const {selectedProject} = useProjectStore()
    const {tasks} = useTaskStore()
    console.log("tasks", tasks);
    

    return <div className="p-2 grid lg:grid-cols-3 grid-cols-1 gap-4">
        {selectedProject.tasks.length > 0 && selectedProject.tasks.map(task => {
            return <TaskDetailDrawer trigger={<TaskListCard task={task}  />} />
        })}
        
    </div>
}