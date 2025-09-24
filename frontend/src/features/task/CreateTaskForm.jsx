import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import MembersChecklist from "@/widget/MembersChecklist";
import ChooseAssignee from "./ChooseAssignee";
import { useProjectStore } from "@/store/useProjectStore";
import { useState } from "react";
import { errorToaster } from "@/widget/toaster";
import { useTaskStore } from "@/store/useTaskStore";
import { Loader2 } from "lucide-react";


export default function CreateTaskForm({setOpen}){
    const {selectedProject} = useProjectStore()
    const {createTask, isCreatingTask} = useTaskStore()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [priority, setPriority] = useState("")
    const [assignee, setAssignee] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(!title) return errorToaster("Cannot create task without title!", "", "X") 
        if(!assignee) return errorToaster("Choose an assignee to create a task!", "", "X") 
        await createTask({title, description, dueDate, priority, assignee, projectId: selectedProject._id}) 
        setOpen(false)
    }

    return <form  onSubmit={handleSubmit} className="flex lg:p-4 p-1 lg:flex-nowrap flex-wrap justify-between gap-5">
        <div className="w-2/3 lg:scale-100 scale-75">

            {/* Title */}
            <div className="flex p-2 flex-col gap-1">
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full focus:border-none" placeholder="Title"/>
            </div>

            {/* Description */}
            <div className="flex p-2 flex-col gap-1">
                <label>Description</label>
                <textarea style={{resize: "none"}} value={description} onChange={(e) => setDescription(e.target.value)} className="input overflow-y-scroll w-full p-3 min-h-20 focus:border-none" placeholder="Title"></textarea>
            </div>

            {/* Duedate and priority */}
            <div className="flex p-2 justify-between lg:flex-nowrap flex-wrap w-full gap-2">
                <div className="flex p-2 flex-col gap-1">
                    <label>Due Date</label>
                    <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" className="input w-full focus:border-none" placeholder=""/>
                </div>
                <div className="flex p-2 flex-col gap-1">
                    <label>Priority</label>
                    <Select value={priority} onValueChange={(e) => setPriority(e)}>
                        <SelectTrigger className="flex items-center gap-2">
                            <SelectValue placeholder='Choose priority' />
                        </SelectTrigger>
                        <SelectContent className="border-0 bg-base-300">
                            <SelectGroup>
                                <SelectLabel className="text-muted text-xs">Priority</SelectLabel>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Submit button */}
            <div className="flex p-2 items-center gap-2 justify-between">
                <Button type={`submit`} className={`w-3/4`}>{isCreatingTask ? <Loader2 className="animate-spin" /> : "Create Task"}</Button>
                <Button type="button" onClick={() => setOpen(false)} className={`w-1/4`} variant={`outline`}>Cancel</Button>
            </div>

        </div>

        {/* assignee field */}
        <div className="bg-light-200 flex flex-col gap-4 border-2 border-gray-600 rounded-xl w-1/3">
            <div className="flex items-center flex-col gap-1">
                <div className="text-sm">Choose assignee!</div>
                <div className="text-[10px] text-muted">Assignee is user assigned to this task.</div>
            </div>
            <div className="flex gap-2 pl-4 pr-3 flex-col">
                <ChooseAssignee assignee={assignee} setAssignee={setAssignee} members={selectedProject.members}  />
            </div>
        </div>

    </form>
}