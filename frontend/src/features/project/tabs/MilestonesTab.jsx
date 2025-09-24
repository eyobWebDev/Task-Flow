import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useProjectStore } from "@/store/useProjectStore";
import CreateMilestoneDialog from "@/widget/feature/CreateMilestoneDialog";
import MilestoneCard from "@/widget/feature/MilestoneCard";
import StatusBadge from "@/widget/StatusBadge";


export default function MilestonesTab(){
    const {selectedProject} = useProjectStore()
    console.log(selectedProject);
    
    return <div className="flex lg:p-4 text-blue-200 p-2 flex-col gap-3">
        {/* header */}
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Milestones</div>
                <CreateMilestoneDialog trigger={<Button className={`btn text-sm btn-sm`}>+ Add milestone</Button>} />
            </div>

            <div className="text-xs opacity-70">Milestone is significant checkpoint that marks progress.</div>
        </div>

        {/* milestone listview */}
        <div className="flex flex-col pl-3 pt-3 gap-3">

            {selectedProject.milestones.length > 0 ? selectedProject.milestones.map(milestone => {
                return <MilestoneCard milestone={milestone} />
            }) : <div className="p-10 text-blue-200 gap-3 flex flex-col items-center">
                    <div>No Milestones!</div>
                    <CreateMilestoneDialog trigger={<Button variant={`outline`}>Create your first milestone</Button>} />
                </div>
            }

        </div>
    </div>
}