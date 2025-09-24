import { ScrollArea } from "@/components/ui/scroll-area";
import MembersListView from "@/features/workspace/MembersListView";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import CustomMenuBar from "@/widget/CustomMenuBar";
import MemberListUserCard from "@/widget/feature/MemberListUserCard";
import PendingMembersListUserCard from "@/widget/feature/PendingMembersListUserCard";
import StackedAvatar from "@/widget/feature/StackedAvatar";
import StatusBadge from "@/widget/StatusBadge";
import { ChevronDown} from "lucide-react";
import { useEffect } from "react";


export default function MembersTab(){
    const {selectedProject, getAllInvitations, invitations} = useProjectStore()
    const {authUser, socket} = useAuthStore()
    const pendingInvitationsList = invitations.filter(invite => invite.invitedBy._id == authUser._id && invite.status == "pending" && invite.projectId._id == selectedProject._id)
    const acceptedMembersList = invitations.filter(invite => invite.invitedBy._id == authUser._id && invite.status == "accepted" && invite.projectId._id == selectedProject._id)
    
    useEffect(() => {
        getAllInvitations()

        socket.on("newPendingInvite", newInvite => {
            pendingInvitationsList.push(newInvite)
        })
    }, [])
   
    return <div className="flex flex-col text-blue-200 gap-3">   
        {/* header section */}
        <div className="flex flex-col gap-1 flex-wrap">
            {/* Title and dropdown menus (sort by and filter by) */}
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Members</div>
                <div className="flex items-center gap-3">
                    <CustomMenuBar 
                        trigger={<div className="p-1 text-muted flex gap-1 items-center rounded text-sm tras-bg-hover"><div>Sort By</div> <ChevronDown size={20} /></div>}
                        itemsList={[
                            [
                                {title: "Last Updated"},
                                {title: "Name"},
                                {title: "Progress"},
                                {title: "Deadline"},
                            ]
                        ]}
                        content_style={"bg-light-100"}
                    />
                
                    <CustomMenuBar 
                        trigger={<div className="p-1 text-muted flex gap-1 items-center rounded text-sm tras-bg-hover"><div>Filter By</div>
                            <ChevronDown size={20} /></div>}
                        itemsList={[
                            [
                                {title: "Status", subs: [{name: "Active"}, {name: "On Hold"}, {name: "Completed"}]},
                                {title: "Visibility", subs: [{name: "Public"}, {name: "Private"}]},
                                {title: "Tags", subs: [{name: "#UI"}]},
                            ]
                            
                        ]}
                        content_style={"bg-light-100"}
                    />
                </div>
            </div>

            {/* subtext */}
            <div className="text-xs opacity-70">
                Manage people and permission for this project
            </div>
        </div>
        
        <div className="flex justify-between gap-1">
            {/* members list view */}
            <div className="flex flex-col w-2/3 p-2 gap-4">
                <div className="text font-semibold">All members in this project</div>
                {/* display the members */}
                <div className="flex flex-col gap-3 pl-3">
                    {selectedProject.members.length > 0 && selectedProject.members.map(member => {
                        return <MemberListUserCard projectId={selectedProject._id} member={member} />
                    })}
                </div>
            </div>

            {/* Pending members list */}
            <ScrollArea className="flex flex-col w-1/3 lg:h-70 h-50 border-gray-600 border-2 rounded bg-light-200 p-2 gap-4">
                <div className="text-xs text-center pb-2 sticky top-0 bg-light-200 z-5 font-semibold">Pending members</div>

                {/* display the members */}
                <div className="flex flex-col gap-3 pl-3">
                    { pendingInvitationsList.length > 0 ?
                        pendingInvitationsList.map(invite => {
                            return <PendingMembersListUserCard username={invite.username} role={invite.role} status={invite.status} />
                        }) : <div>
                            No pending list
                        </div>
                    }
                </div>
            </ScrollArea>
        </div>

    </div>
}