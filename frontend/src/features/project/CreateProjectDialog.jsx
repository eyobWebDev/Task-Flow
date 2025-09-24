import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateProjectForm from "./CreateProjectForm";
import { Button } from "@/components/ui/button";


export default function CreateProjectDialog({trigger}){

    return <Dialog>
        <DialogTrigger>{trigger || <Button>Open</Button>}</DialogTrigger>
         <DialogContent className="flex bg-light-100  min-w-2/3 lg:p-8 md:p-5 p-3 rounded-2xl border-gray-500 flex-col gap-4">

            {/* Header */}
            <div className="flex flex-col gap-2">
                <h2 className={`text-center text-2xl`}>Create A Project</h2>
                <div className={`text-center opacity-70`}>A Project is where you and your team manages and collaborate on task and milestone!</div>
            </div>

            {/*  workspace form */}
            <CreateProjectForm />
        </DialogContent>
    </Dialog>
}