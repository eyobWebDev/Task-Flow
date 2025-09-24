import { Checkbox } from "@/components/ui/checkbox";
import { FormatDate } from "@/utils/FormatDate";
import StatusBadge from "../StatusBadge";
import { Trash2 } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";


export default function MilestoneCard({milestone}){
    const {removeMilestone, selectedProject, toggleCompleteMilestone} = useProjectStore()

    return <div className="flex p-3 bg-light-100 lg:w-3/4 w-full rounded-xl flex-col gap-1">
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Checkbox checked={milestone.isComplete} onClick={async () => await toggleCompleteMilestone({projectId: selectedProject._id, milestoneId: milestone._id})}  className={`scale-85`} />
                <div className="font-semibold">{milestone.title}</div>
            </div>

            <div className="flex items-center gap-1">
                <StatusBadge color={milestone.isComplete ? "green" : "red"} status={milestone.isComplete ? "complete" : "Incomplete"} />
                <Trash2 onClick={async () => await removeMilestone({projectId: selectedProject._id, milestoneId: milestone._id})} className="hover:cursor-pointer" size={15} />
            </div>
        </div>

        <div className="text-xs flex items-center justify-between gap-4 opacity-80">
            <div className="w-3/4">{milestone.description}</div>
            <div className="w-1/4 text-right">{milestone.dueDate && FormatDate(milestone.dueDate)}</div>
        </div>

    </div>
}