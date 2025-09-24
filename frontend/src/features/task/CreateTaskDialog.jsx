import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskForm from "./CreateTaskForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";


export default function CreateTaskDialog({trigger}){
    const [open, setOpen] = useState(false)

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{trigger || <Button>Open</Button>}</DialogTrigger>
        <DialogContent className={`bg-light-100 min-w-3/4`}>
            <ScrollArea className={`flex min-h-[50vh] border-red-300 flex-col gap-7 `}>
                <DialogHeader className={`flex flex-col items-center`}>
                    <div className="text-2xl font-bold">Create Task!</div>
                    <div className="text-xs text-muted">Add task to your current project</div>
                </DialogHeader>

                <div className="lg:pl-8 pl-1">
                    <CreateTaskForm setOpen={setOpen} />
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
}