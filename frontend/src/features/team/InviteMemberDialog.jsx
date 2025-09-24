import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/useAuthStore";
import { useOpenComponentStore } from "@/store/useOpenComponentStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { errorToaster } from "@/widget/toaster";
import { Loader2 } from "lucide-react";
import { useState } from "react";


export default function InviteMemberDialog({trigger}){
    const {openInviteMemberDialog, setOpenInviteMemberDialog} = useOpenComponentStore()
    const {inviteMember, selectedProject, isInvitingMember} = useProjectStore()
    const {authUser} = useAuthStore()
    const {selectedWorkspace} = useWorkspaceStore()
    const [role, setRole] = useState("")
    const [value, setValue] = useState("")

    const handleInviteMember = async (e) => {
        e.preventDefault()
        if(!value) return errorToaster("You cant sent invitation to empty user.", "", "X")
        const user = selectedProject.members.find(member => member.userId.username == authUser.username && member.role == "project-owner" || member.role == "project-admin")
        if(!user) return errorToaster("only admin can invite a member.", "", "X")
        {/* projectId, workspaceId, email, username, role, token */}
        await inviteMember({projectId: selectedProject._id, workspaceId: selectedWorkspace._id, username: value.startsWith("@") && value.slice(1, value.length), email: value.startsWith("@") ? "" : value, role, token: Date.now().toString()})
        console.log("invitation sent to project");
        setOpenInviteMemberDialog(false)
    }

    return <Dialog open={openInviteMemberDialog} onOpenChange={setOpenInviteMemberDialog}>
        <DialogTrigger asChild><span onClick={() => setOpenInviteMemberDialog(true)}>
          {trigger}
        </span></DialogTrigger>

        <DialogContent className={`bg-light-100 flex flex-col min-w-3/4 min-h-4/5`}>
            <DialogHeader className={`flex flex-col items-center`}>
                <div className="text-2xl font-bold">Invite Member to Project</div>
                <div className="text-xs text-muted">Once invited they will get an email or username invitation. Once accepted they will appear in the project's member!</div>
            </DialogHeader>

            <Separator className={`h-0.5 w-full bg-gray-700 m-4`} />

            <div className={`flex pl-5 pr-5 justify-center`}>
                {/* form area */}
                <form onSubmit={handleInviteMember} className={`flex w-3/4 bg-base-300 border-gray-600 p-5 min-h-50 border-2 rounded  flex-col gap-7`}>
                    <h2 className="text-center">Invite member</h2>
                    {/* input area */}
                    <div className="flex items-center gap-3">
                        <input value={value} onChange={(e) => setValue(e.target.value)} className="input w-3/4 focus:border-none" placeholder="@username or email" />
                        <div className="w-1/4">
                            <Select value={role} onValueChange={(e) => setRole(e)}>
                                <SelectTrigger className="flex items-center gap-2">
                                    <SelectValue placeholder='Choose a role' />
                                </SelectTrigger>
                                <SelectContent className="border-0 bg-base-300">
                                    <SelectGroup>
                                        <SelectLabel className="text-muted text-xs">Role</SelectLabel>
                                        <SelectItem value="project-admin">Admin</SelectItem>
                                        <SelectItem value="project-member">Member</SelectItem>
                                        <SelectItem value="viewer">Guest</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* button area*/}
                    <div className="flex items-center gap-3">
                        <Button type={`submit`} className="btn w-3/4">{isInvitingMember ? <Loader2 className="animate-spin" /> : "Invite"}</Button>
                        <Button type={`button`} onClick={() => setOpenInviteMemberDialog(false)} className="w-1/4 btn-active btn" variant={`outline`}>Cancel</Button>
                    </div>
                </form>

                {/* auto suggest user in the workspace */}
                {/* autoSuggest && <div className="flex flex-col w-1/3 bg-base-200 border-gray-600 p-3 border-2 rounded gap-2">
                    <div className="flex justify-center text-blue-200 opacity-70 text-xs">Incluse these users from the worksapce</div>
                    <div className="flex gap-6 items-center flex-wrap">
                        <div className="flex items-center p-1 tras-bg rounded gap-3">
                            <Checkbox className={`scale-75`} id="user" />
                            <label className="flex items-center gap-1" htmlFor="user"><StackedAvatar size={`small`} avatars={[{alt: "J"}]} /> John</label>
                        </div>
                    </div>
                </div> */}
            </div>

        </DialogContent>
    </Dialog>
}