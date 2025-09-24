import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { FormatDateShort } from "@/utils/FormatDate";
import CustomDot from "@/widget/CustomDot";
import InvitationListCard from "@/widget/feature/InvitationListCard";
import StackedAvatar from "@/widget/feature/StackedAvatar";
import { CheckCheckIcon, Milestone, MoveDownLeft, SquareCheckBig } from "lucide-react";
import { useEffect } from "react";


export default function InvitationsListView() {
    const {authUser, checkAuth} = useAuthStore()
    const invitations = authUser.invitations.length > 0 && authUser.invitations.filter(invite => invite.status == "pending" && invite.username == authUser.username)
    
    useEffect(() => {
        checkAuth()
    }, [])

    return <div className="flex flex-col p-3 pl-7 text-blue-200 gap-5">
        <div className="flex flex-col gap-1">
            <div className="text-3xl font-semibold">Invitations</div>
            <div className="text-sm opacity-80">All of workspaces/projects you have been invited to.</div>
        </div>

        <div className="pl-5 p-2 grid lg:grid-cols-2 grid-cols-1 gap-4">
            { invitations.length > 0 ?
              invitations.map(invite => {
                    return <InvitationListCard token={invite.token} id={invite.projectId._id} name={invite.projectId.name} role={invite.role} invitedBy={invite.invitedBy.username} membersList={invite.projectId.members.length} milestoneCount={invite.projectId.milestones.length} taskCount={invite.projectId.tasks.length} joinedAt={FormatDateShort(invite.createdAt)} />
                }) : 
                <div className="text-center mt-4 font-bold w-full col-span-2">
                    No Invitationes Recieved!
                </div>
            }
        </div>
    </div>
}