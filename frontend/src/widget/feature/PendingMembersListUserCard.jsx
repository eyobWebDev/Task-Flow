import { UserIcon } from "lucide-react";
import StatusBadge from "../StatusBadge";
import StackedAvatar from "./StackedAvatar";


export default function PendingMembersListUserCard({username, role, status}){

    return <div className="flex items-center justify-between rounded-xl gap-3 p-2 pl-4 bg-base-300">
        <div className="flex items-center gap-2">
            <UserIcon size={30} className="p-2 rounded-full bg-light-200" />
            <div className="flex flex-col">
                <div className="text-sm opacity-85">{username}</div>
                <div className="text-[10px] text-muted">{role}</div>
            </div>
        </div>

        <div>
            <StatusBadge color={`blue`} status={status} />
        </div>
    </div>
}