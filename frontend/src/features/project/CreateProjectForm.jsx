import { Button } from "@/components/ui/button"
import { MenubarRadioGroup } from "@/components/ui/menubar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuthStore } from "@/store/useAuthStore"
import { useProjectStore } from "@/store/useProjectStore"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import MembersChecklist from "@/widget/MembersChecklist"
import { errorToaster } from "@/widget/toaster"
import { BookText, FolderEdit, Loader2, Timer, UserPen, Users } from "lucide-react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"


export default function CreateProjectForm(){
    const {isCreatingWorkspace, createWorkspace, selectedWorkspace} = useWorkspaceStore()
    const {selectedProject, isCreatingProject, createProject} = useProjectStore()
    const {authUser} = useAuthStore()
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
console.log(authUser);

    const handleSubmit =async (e) => {
        e.preventDefault()
        if(!name) return errorToaster("You cannot create project without name", "", "X")

        await createProject({name, description, workspaceId: authUser.lastActiveWorkspace._id})
        navigate(`/workspace/${authUser.lastActiveWorkspace._id}/projects/${selectedProject?._id}`)
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name field */}
        <div className="flex flex-col gap-2">
            <label>
             <span className="label-text text-gray-300">Name</span>
            </label>
            <div className="text-gray-300 flex gap-4 items-center relative mb-4">
            <FolderEdit className="absolute z-10 left-3 top-2 w-5 h-5" />
                <input
                  name="name"
                  type={`text`}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input focus:border-0 input-bordered w-full pl-10"
                />
            </div>
        </div>

        {/* Description field */}
        <div className="flex flex-col gap-2">
            <label>
             <span className="label-text text-gray-300">Description</span>
            </label>
            <div className="text-gray-300 flex gap-4 items-center relative mb-4">
            <BookText className="absolute z-10 left-3 top-2 w-5 h-5" />
                <textarea
                  name="description"
                  type={`text`}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input input-bordered w-full min-h-30 focus:border-0 pl-10"
                ></textarea>
            </div>
        </div>

        {/* Status field 
        <div className="flex flex-col gap-2">
            <label>
            <span className="label-text text-gray-300">Status</span>
            </label>
            <div className="text-gray-300 p-3 flex gap-4 items-center relative mb-4">
            <RadioGroup value={status} onValueChange={setStatus} className={`flex item-center gap-4`}>
                    <div className="flex items-center gap-2"><RadioGroupItem value='active' /> Active</div>
                    <div className="flex items-center gap-2"><RadioGroupItem value='on-hold' /> On Hold</div>
                    <div className="flex items-center gap-2"><RadioGroupItem value='archive' /> Archive</div>
            </RadioGroup>
            </div>
        </div> */}

    <div className="flex pl-2 pr-2 gap-4">
        <Button type="submit" className={`btn-ghost btn w-3/5`}>{isCreatingProject ? <Loader2 className="animate-spin" />:"Create Project"}</Button>
        <NavLink className={`btn btn-active w-1/5`} to={`/workspace/${selectedWorkspace?._id}/projects`}>Cancel</NavLink>
    </div>

    </form>
}