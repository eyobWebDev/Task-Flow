import { Button } from "@/components/ui/button"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { errorToaster } from "@/widget/toaster"
import { BookText, FolderEdit, Loader2, UserPen, Users } from "lucide-react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"


export default function WorkspaceForm(){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const {isCreatingWorkspace, createWorkspace, selectedWorkspace} = useWorkspaceStore()

    const handleSubmit =async (e) => {
        e.preventDefault()
        if(!name) return errorToaster("You cannot create workspace without name", "", "X")

        navigate(`/workspace/${selectedWorkspace._id}/projects`)
        
        await createWorkspace({name, description})
        
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

        {/* Invite member   <div className="flex flex-col gap-2">
            <label>
             <span className="label-text text-gray-300">Invite members</span>
            </label>

            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                <div className="text-gray-300 flex gap-4 items-center relative mb-4">
                <Users className="absolute z-10 left-3 top-2 w-5 h-5" />
                    <input
                    name="name"
                    type={`text`}
                    placeholder="Enter username"
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    className="input focus:border-0 input-bordered w-full pl-10"
                    />
                    <Button>{members.length > 0 ? "Invite" : "Add"}</Button>
                </div>

                {members.length > 0 && <div className="flex gap-5">
                    <div className="flex flex-col gap-1 text-[13px]">
                    {
                        members.map(member => {
                            return <div className="text-muted">{member.name} - {member.role}</div>
                        })
                    }
                    </div>
                    <Button className={`btn btn-sm`}>Invite members</Button>
                </div>}
            </div>
            
        </div> */}


    <div className="flex gap-4">
        <Button type="submit" className={`btn-ghost btn w-4/5`}>{isCreatingWorkspace ? <Loader2 className="animate-spin" />: "Create workspace"}</Button>

        <NavLink className={`btn btn-active w-1/5`} to={`/workspace`}>Cancel</NavLink>
    </div>

    </form>
}