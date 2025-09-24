import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateTaskForm from "@/features/task/CreateTaskForm";
import { useState } from "react";
import { errorToaster } from "../toaster";
import { useProjectStore } from "@/store/useProjectStore";
import { Loader2 } from "lucide-react";


export default function CreateMilestoneDialog({trigger}) {
    const {addMilestone, selectedProject, isAddingMilestone} = useProjectStore()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(title == "") return errorToaster("You cannot create milestone without title!", "", "X")
        if(dueDate == "") return errorToaster("You cannot create milestone without due Date!", "", "X")
        
        await addMilestone({title, description, projectId: selectedProject._id, dueDate})
        setOpen(false)
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{trigger || <Button>Open</Button>}</DialogTrigger>
        <DialogContent className={`bg-light-100 min-w-2/4`}>
            <ScrollArea className={`flex min-h-[50vh] border-red-300 flex-col gap-7 `}>
                <DialogHeader className={`flex flex-col items-center`}>
                    <div className="text-xl font-bold">Create Milestone!</div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="lg:pl-8 pl-2">
                    {/* Title */}
                    <div className="flex p-2 flex-col gap-1">
                        <label>Title</label>
                        <input className="input w-full focus:border-none" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
                    </div>

                    {/* Description */}
                    <div className="flex p-2 flex-col gap-1">
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{resize: "none"}} className="input overflow-y-scroll w-full p-3 min-h-20 focus:border-none" placeholder="Description"></textarea>
                    </div>

                    {/* Duedate and is complete */}
                    <div className="flex p-2 justify-between lg:flex-nowrap flex-wrap w-full gap-2">
                        <div className="flex p-2 flex-col gap-1">
                            <label>Due Date</label>
                            <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" className="input w-full focus:border-none" placeholder="Title"/>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="flex p-2 items-center gap-2 justify-between">
                        <Button type="submit" className={`w-3/4`}>{isAddingMilestone ? <Loader2 className="animate-spin"/> : "Create Milestone"}</Button>
                        <Button onClick={() => setOpen(false)} className={`w-1/4`} variant={`outline`}>Cancel</Button>
                    </div>
                </form>
            </ScrollArea>
        </DialogContent>
    </Dialog>
}