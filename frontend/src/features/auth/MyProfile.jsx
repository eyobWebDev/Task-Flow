import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { FormatDate, FormatDateShort } from "@/utils/FormatDate";
import CustomTooltip from "@/widget/CustomTooltip";
import MyProfileInfoBox from "@/widget/feature/MyProfileInfoBox";
import MyProfileSmallInfoBox from "@/widget/feature/MyProfileSmallInfoBox";
import { Edit, ImagePlus, User } from "lucide-react";


export default function MyProfile(){
    const {authUser, onlineUsers} = useAuthStore()
    const {myWorkspaces} = useWorkspaceStore()
    const {projects} = useProjectStore()

    return <div className="p-5 lg:pl-10 pl-3 flex text-blue-100 flex-col lg:gap-10 gap-3">

        {/* header */}
        <div className="flex top-10 z-10 pb-2 bg-base-100 sticky flex-col gap-2">
            <div className="text-3xl font-semibold">My profile</div>
            <div className="text-muted text-sm">Manage your account informations.</div>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* left column */}
            <div className="flex flex-col bg-light-100 p-4 rounded gap-2">

                {/* profile pic and full name */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-25 h-25 relative rounded-full border flex justify-center bg-light-100 items-center border-gray-700">
                            {authUser.profilePic ? <img src={authUser.profilePic || ""} className="object-cover w-full h-full" /> : <div className="text-5xl">
                                {authUser.username[0].toUpperCase()}
                                </div>}

                            <div className="absolute flex transition-all duration-400 hover:opacity-100 opacity-0 justify-center items-center top-0 bg-base-200 left-0 w-full h-full bg-light-400 rounded-full">
                                <label htmlFor="change-profile-input"><CustomTooltip trigger={<ImagePlus size={20} />}  text={"change profile picture"} /></label>
                                <input onFocus={() => console.log("focused")
                                } type="file" className="border hidden" id="change-profile-input" />
                            </div>
                        </div>

                        <div className="gap-1 flex flex-col">
                            <div className="text-2xl">{authUser.fullName || authUser.username}</div>
                            <div className="text-sm text-green-200">{onlineUsers.includes(authUser._id) ? "online" : authUser.email}</div>
                        </div>
                    </div>
                    <CustomTooltip trigger={<div className="hover:cursor-pointer"><Edit size={20} /></div>} text={`Edit profile`} />
                </div>
                
                {/* info */}
                <div className="flex flex-col pl-3 mt-4 gap-4">
                    <div className="text-xs font-semibold text-blue-500">Info</div>

                    <div className="lg:pl-2 flex flex-col gap-4 pl-1">
                        <MyProfileInfoBox title={`Full Name`} description={authUser.fullName || "No full name"} />
                        <MyProfileInfoBox title={`Email`} description={authUser.email || "No email"} />
                        <MyProfileInfoBox title={`Username`} description={authUser.username || "No username"} />
                    </div>
                </div>
                
                {/* account and security */}
                <div className="flex flex-col pl-3 mt-4 gap-4">
                    <div className="text-xs font-semibold text-blue-500">Account and security</div>
                        
                    <div className="lg:pl-2 flex flex-col gap-4 pl-1">
                        <MyProfileInfoBox title={`Joined At`} description={FormatDateShort(authUser.createdAt) || ""} />
                        <MyProfileInfoBox title={`Last Login`} description={FormatDateShort(authUser.updatedAt) || ""} />
                        <MyProfileInfoBox title={`Recent Activity`} description={"No recent activities."} />
                        <MyProfileInfoBox title={`Change Password`} description={<Button>Change Password</Button>} />
                    </div>
                </div>

            </div>

             {/* right column */}
            <div className="flex flex-col bg-light-100 p-4 rounded gap-2">
                <div className="text-xl font-semibold mb-2">Stats and Activities.</div>

                {/* workspace and project */}
                <div className="flex flex-col pl-3 mt-4 gap-4">
                    <div className="text-xs font-semibold text-blue-500">Workspace and Project</div>

                    <div className="lg:pl-2 flex flex-col gap-4 pl-1">
                        <MyProfileSmallInfoBox title={"Number of workspaces"} description={myWorkspaces.length} />
                        <MyProfileSmallInfoBox title={"Number of projects"} description={projects.length} />
                        <MyProfileSmallInfoBox title={"Projects you are members of"} description={projects.length} />
                        <MyProfileSmallInfoBox title={"Recent project"} description={authUser.lastActiveProject?.name} callback={() => {}} />
                    </div>
                </div>

                {/* Task and Activity */}
                <div className="flex flex-col pl-3 mt-4 gap-4">
                    <div className="text-xs font-semibold text-blue-500">Task and Activities</div>

                    <div className="lg:pl-2 flex flex-col gap-4 pl-1">
                        <MyProfileSmallInfoBox title={"Total Task Assigned"} description={""} />
                        <MyProfileSmallInfoBox title={"Task Completed"} description={""} />
                        <MyProfileSmallInfoBox title={"Task pending"} description={""} />
                        <MyProfileSmallInfoBox title={"Task Created"} description={""} />
                        <MyProfileSmallInfoBox title={"Task Commented"} description={""} />
                        {/* pie chart and progress bar to show user */}
                    </div>
                </div>

                {/* Achievements */}
                <div className="flex flex-col pl-3 mt-4 gap-4">
                    <div className="text-xs font-semibold text-blue-500">Achievements</div>

                    <div className="lg:pl-2 flex flex-col gap-4 pl-1">
                        <MyProfileSmallInfoBox title={"Project Led"} description={""} />
                        <MyProfileSmallInfoBox title={"Copleted Milestones"} description={""} />
                        <MyProfileSmallInfoBox title={"Tasks Completed this month"} description={""} />
                    </div>
                </div>

                {/* Notification/Alert */}
                <div className="flex flex-col pl-3 mt-4 gap-4">
                    <div className="text-xs font-semibold text-blue-500">Notification/Alert</div>

                    <div className="lg:pl-2 flex flex-col gap-4 pl-1">
                        <MyProfileSmallInfoBox title={"Pending Tasks"} description={""} />
                        <MyProfileSmallInfoBox title={"Task Assignments"} description={""} />
                        <MyProfileSmallInfoBox title={"Mentions Awaiting"} description={""} />
                        <MyProfileSmallInfoBox title={"Upcoming deadline"} description={""} />
                    </div>
                </div>

            </div>

        </div>
    </div>
}