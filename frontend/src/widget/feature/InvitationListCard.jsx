import { ChevronDown, Clock, Loader2, Milestone, SquareCheckBig, SquareUserRoundIcon, User, UserRoundIcon } from "lucide-react";
import StackedAvatar from "./StackedAvatar";
import { Badge } from "@/components/ui/badge";
import { useProjectStore } from "@/store/useProjectStore";
import { errorToaster } from "../toaster";
import { useNavigate } from "react-router-dom";


export default function InvitationListCard({name, invitedBy, membersList, milestoneCount, taskCount, joinedAt, role, id, token}){
    const {acceptOrDeclineInvitation, isAcceptingInvitation} = useProjectStore()
    const navigate = useNavigate()

    const handleAcceptInvite = async () =>{
        if(!id || !token) return errorToaster("no project or token provided.")
        await acceptOrDeclineInvitation({projectId: id, token, accepted: true})
        navigate(-1)
    }

    const handleDeclineInvite = async () =>{
        if(!id || !token) return errorToaster("no project or token provided.")
        await acceptOrDeclineInvitation({projectId: id, token, accepted: false})
        navigate(-1) 
    }
    
    return <div className="flex flex-col bg-light-100 p-2 pl-3 pr-3 rounded gap-3">
        <div className="flex justify-between text-sm">
            <div className="flex gap-2 items-center">
                <div className="text-lg font-semibold">{name}</div>
                <ChevronDown size={15} className="text-muted" />
            </div>

            <div className="flex items-center text-xs gap-1">
                <div>Invited by</div> 
                <div className="font-semibold">{invitedBy}</div>
                <Badge variant={`outline`} className={`flex items-center gap-1`}><SquareUserRoundIcon size={15} />
                <div className="text-[10px]">{role}</div></Badge> 
            </div>
        </div>
        <div className="flex justify-between text-sm">
            <div className="flex items-center opacity-75 w-2/3 justify-between">
                {/* <StackedAvatar size={`small`} avatars={membersList} /> */}
                <div className="flex items-center text-xs gap-2"><User size={15} /> <div>{membersList}</div></div>
                <div className="flex items-center text-xs gap-2"><Milestone size={15} /> <div>{milestoneCount}</div></div>
                <div className="flex items-center text-xs gap-2"><SquareCheckBig size={15} /> <div>{taskCount}</div></div>
                <div className="flex items-center text-xs gap-2"><Clock size={15} /> <div>{joinedAt || `taskCount`}</div></div>

            </div>
            <div className="flex items-center gap-2">
                <button onClick={handleAcceptInvite} className="btn btn-xs btn-info text-white">{isAcceptingInvitation ? <Loader2 className="animate-spin" /> : "Accept"}</button>
                <button onClick={handleDeclineInvite} className="btn btn-xs btn-error text-white">{isAcceptingInvitation ? <Loader2 className="animate-spin" /> : "Decline"}</button>
            </div>
        </div>
    </div>
}