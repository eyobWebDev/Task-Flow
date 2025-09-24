import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CreateTaskDialog from "@/features/task/CreateTaskDialog";
import InviteMemberDialog from "@/features/team/InviteMemberDialog";
import { useProjectStore } from "@/store/useProjectStore";
import { FormatDate, FormatDateRelative } from "@/utils/FormatDate";
import ActivityCard from "@/widget/ActivityCard";
import CircleProfileBadge from "@/widget/CircleProfileBadge";
import CustomTooltip from "@/widget/CustomTooltip";
import CreateMilestoneDialog from "@/widget/feature/CreateMilestoneDialog";
import ProjectOverviewSummaryCard from "@/widget/feature/ProjectOverviewSummaryCard";
import StackedAvatar from "@/widget/feature/StackedAvatar";
import PinnedFileCard from "@/widget/PinnedFileCard";
import StatusBadge from "@/widget/StatusBadge";
import UserStatus from "@/widget/UserStatus";
import { ActivitySquareIcon, ArchiveRestore, ArrowRight, ChartArea, CheckSquare, Clock, Clock4Icon, Edit, File, FileDown, FilePlus2, FolderArchive, Milestone, MilestoneIcon, Paperclip, Pin, PlusSquare, Timer, TimerIcon, User, UserPlus, Users } from "lucide-react";
import EditProjectDrawer from "../EditProjectDrawer";
import { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";


export default function OverviewTab(){
    const {selectedProject, inviteMember}= useProjectStore()
    const {selectedWorkspace} = useWorkspaceStore()
    
    const completedMilestone = selectedProject?.milestones.length > 0 && selectedProject.milestones.filter(ms => ms.isComplete == true)
    const color = selectedProject.status == "active" ? "green" : selectedProject.status == "on-hold" ? "blue" : selectedProject.status == "completed" ? "gray" : "red"
    const completedTasks = selectedProject.tasks.length > 0 && selectedProject.tasks.filter(task => task.status == "done")
    const [milestoneProgressValue, setMilestoneProgressValue] = useState((completedMilestone.length / selectedProject.milestones.length) * 100)
    const [taskProgressValue, setTaskProgressValue] = useState((completedTasks.length / selectedProject.tasks.length) * 100)

    useEffect(() => {
        setMilestoneProgressValue((completedMilestone.length / selectedProject.milestones.length) * 100)
    }, [completedMilestone])


    return <div className="flex text-blue-100 flex-col gap-5">
        
        {/* header section */}
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <div className="text-2xl font-semibold">{selectedProject.name || "Project name"}</div> 
                    <StatusBadge color={color} status={selectedProject.status} />
                </div>
                <div className="lg:text-xs text-[10px] opacity-60 text-blue-200 flex gap-4 items-center">
                    <div>Created by: {selectedProject.createdBy.username}</div>
                    <div>Last Updated: {FormatDateRelative(selectedProject.updatedAt)}</div>
                    <div>Visibility: {selectedProject.visibility}</div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <EditProjectDrawer trigger={<CustomTooltip trigger={<Edit className="p-1 tras-bg-hover rounded" />} text={'Edit project'} />} />
                <CustomTooltip trigger={<ArchiveRestore className="p-1 tras-bg-hover rounded" />} text={'Archive project'} />
            </div>
        </div>

        {/* description section */}
        <div className="text-sm text-muted">
            {selectedProject.description}
        </div>

        {/* Summary card section */}
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">

            {/* Task card */}
            <ProjectOverviewSummaryCard icon={<CheckSquare size={15} />}
            rightIcon={<CreateTaskDialog trigger={<PlusSquare size={25} className="p-1 rounded tras-bg-hover hover:cursor-pointer" />} />}
            label={`Tasks`}
            primaryInfo={`Total ${selectedProject.tasks.length}`}
            secondaryInfo={selectedProject.tasks.length > 0 && <><li>{selectedProject.tasks.length - completedTasks.length} Opened</li><li>{completedTasks.length} Completed</li></>}
            elements={<div className="flex text-xs gap-2 w-full items-center">
                <div>{completedTasks.length || 0}/{selectedProject?.tasks.length}</div>
                <Progress className={``} value={taskProgressValue} />
                <div>{taskProgressValue || 0}%</div>
            </div>}
            />
            
            {/* Milestone Card */}
            <ProjectOverviewSummaryCard icon={<MilestoneIcon size={15} />}
            rightIcon={<CreateMilestoneDialog trigger={<PlusSquare size={25} className="p-1 rounded tras-bg-hover hover:cursor-pointer" />} />}
            label={`Milestone`}
            primaryInfo={`Total ${selectedProject.milestones.length}`}
            secondaryInfo={selectedProject.milestones.length > 0 && <><li>{selectedProject.milestones.length - completedMilestone.length} Upcoming</li><li>{completedMilestone.length} Completed</li></>}
            elements={<div className="flex gap-2 text-xs w-full items-center">
                <div className="flex gap-2">{completedMilestone.length || 0}/{selectedProject?.milestones.length}</div>
                <Progress className={``} value={milestoneProgressValue} />
                <div>{milestoneProgressValue || 0}%</div>
            </div>}
            />

            {/* Team members Card */}
            <ProjectOverviewSummaryCard icon={<Users size={15} />}
            rightIcon={<InviteMemberDialog trigger={<UserPlus size={25} className="p-1 rounded tras-bg-hover hover:cursor-pointer" />} />}
            label={`Team Members`}
            primaryInfo={`Total ${selectedProject.members.length}`}
            secondaryInfo={<StackedAvatar size={`small`} avatars={
                selectedProject.members.length > 0 &&
                selectedProject.members.map(member => {
                    if(member.userId) return {src: member.userId.profilePic, alt: member.userId.username[0].toUpperCase()}
                })
            } />}
            />

            {/* deadline Card */}
            <ProjectOverviewSummaryCard icon={<TimerIcon size={15} />}
            label={`Deadline`}
            primaryInfo={selectedProject.dueDate ? `Due date ${FormatDate(selectedProject.dueDate)}` : "Not set yet!"}
            secondaryInfo={selectedProject.dueDate && <li>12 Days left</li>}
            />

        </div>

        {/* Recent activity and milestone stats */}
        <div className="grid p-2 gap-10 lg:w-2/3 w-full text-blue-200 lg:grid-cols-2 grid-cols-1">

            {/* Milestone area */}
            <ActivityCard icon={<Milestone size={15} />} title={`Milestone preview`} items={
                selectedProject.milestones.length > 0 ? selectedProject.milestones.map(milestone => `${milestone.title}`) : ["No milstone"]
            } />

            <ActivityCard icon={<ActivitySquareIcon size={15} />} title={`Activity feed`} 
            items={
                selectedProject.activityLog.length > 0 ? selectedProject.activityLog.map(activity => `${activity.message}`) : ["No Activities yet!"]
            } />
        </div>

        {/* Pinned files */}
        <div className="flex text-blue-200 opacity-80 flex-col">

            {/* title */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold"><Pin size={15} />Pinned Files 12</div>
                <div className="font-semibold flex gap-2 items-center p-2 hover:cursor-pointer rounded tras-bg-hover">View all <ArrowRight size={15} /></div>
            </div>

            {/* pinned file card */}
            <div className="flex items-center gap-4 flex-wrap">
                {selectedProject.pinnedFiles.length > 0 ? 
                selectedProject.pinnedFiles.map(file => <PinnedFileCard fileName={file.fileName} fileType={file.fileType} user={file.uploadedBy.username} createdAt={`${FormatDate(file.uploadedAt)}`} count={`12`} />) : "No Pinned files."}
            </div>
        </div>

    </div>
}