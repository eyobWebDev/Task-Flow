import { ChevronDown, Clock, Paperclip, Trash2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
import StackedAvatar from "./StackedAvatar";
import CustomMenuBar from "../CustomMenuBar";
import { useProjectStore } from "@/store/useProjectStore";
import { useAuthStore } from "@/store/useAuthStore";


export default function MemberListUserCard({member, projectId}){
    const {removeMember, isRemovingMember} = useProjectStore()
    const {authUser} = useAuthStore()
    const color = member.role == "project-admin" ? "green" : member.role == "project-owner" ? "blue" : member.role == "project-member" ? "purple" : "red"

    const handleRemoveMember = async () => {
        await removeMember({projectId, memberId: member._id, invitedBy: authUser._id, username: member.userId.username})
    }

    return <div className="flex flex-col rounded-xl gap-5 p-2 pl-4 bg-base-300">
        <div className="flex items-center justify-between">
            {member.userId && <div className="flex items-center gap-2">
                <StackedAvatar size={`big`} avatars={[{src: member.userId.profilePic, alt: member.userId.username[0].toUpperCase()}]} />
                <div className="flex flex-col">
                    <div className="text-sm opacity-85">{member.userId.username}</div>
                    <div className="text-[10px] text-muted">{member.userId.email}</div>
                </div>
            </div>}

            <div>
                <StatusBadge color={`green`} status={member.role} />
            </div>
        </div>
        {/* meta datas */}
        <div className="flex text-xs justify-around gap-3">
            <div className="flex hover:cursor-pointer items-center opacity-70 hover:opacity-95 gap-1"><Clock size={12} /> sep 12 </div>
            <CustomMenuBar trigger={<div className="flex hover:cursor-pointer items-center opacity-70 hover:opacity-95 gap-1"><ChevronDown size={12} /> Role </div>}
            itemsList={[
                [
                    {title: "Admin"}, {title: "Member"}, {title: "Guest"},
                ]
            ]}/>
            <div onClick={handleRemoveMember} className="flex hover:cursor-pointer items-center opacity-70 hover:opacity-95 gap-1"><Trash2 size={12} /> {isRemovingMember ? "Removing..." : "Remove"} </div>
            <div className="flex hover:cursor-pointer items-center opacity-70 hover:opacity-95 gap-1"><Paperclip size={12} /> 6 </div>
        </div>

    </div>
}