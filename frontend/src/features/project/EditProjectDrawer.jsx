import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useOpenComponentStore } from "@/store/useOpenComponentStore"
import { useProjectStore } from "@/store/useProjectStore"
import { FormatDate } from "@/utils/FormatDate"
import TipTapEditor from "@/utils/TipTapEditor"
import CustomMenuBar from "@/widget/CustomMenuBar"
import PinnedFileCard from "@/widget/PinnedFileCard"
import StatusBadge from "@/widget/StatusBadge"
import { errorToaster } from "@/widget/toaster"
import { ChevronDown, Copy, Eye, EyeOff, FileCodeIcon, Loader2, MoveUpRight, Paperclip, Plus, Rows4, Trash2, X } from "lucide-react"
import { useState } from "react"


export default function EditProjectDrawer({trigger}){
    const {selectedProject, editProject, isEditingProject} = useProjectStore()
    const {openEditProjectDrawer, setOpenEditProjectDrawer} = useOpenComponentStore()
    const [name, setName] = useState(selectedProject.name)
    const [description, setDescription] = useState(selectedProject.description)
    const [dueDate, setDueDate] = useState(selectedProject.dueDate)
    const [startDate, setStartDate] = useState(selectedProject.startDate)
    const [status, setStatus] = useState({status: selectedProject.status, color: "green"})
    const [visibility, setVisibility] = useState(selectedProject.visibility)
    const [pinnedFiles, setPinnedFiles] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name) return errorToaster("You cannot edit project with no name!", "", "X")
        
        await editProject({name, description, status: status.status, visibility, projectId: selectedProject._id, dueDate, startDate})
    }

    return <Drawer direction='right' open={openEditProjectDrawer} onOpenChange={setOpenEditProjectDrawer}>
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent className={`lg:min-w-2/3 p-4 h-full text-blue-100 lg:rounded-l-2xl rounded-l-xl min-w-11/12 bg-light-100`} forceMount>
        <ScrollArea className={`h-[100vh] overflow-x-scroll`}>
            <DrawerHeader className={`sticky top-0 z-10 bg-light-100`}>
                <div className={`flex items-center justify-between`}>
                    <DrawerTitle className={`flex justify-center text-center font-bold text-2xl`}>Edit project</DrawerTitle>
                    <DrawerClose><X className="p-1 tras-bg-hover" /></DrawerClose>
                </div>
            </DrawerHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:p-4 p-1">
                {/* Name field */}
                <div className="flex p-2 flex-col gap-1">
                    <label>Name</label>
                    <input className="input w-full focus:border-none" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                </div>

                {/* header field */}
                <div className="flex text-sm items-center mb-5 flex-wrap justify-between pl-2 gap-4 ">
                    {/* visibility */}
                    <div className="flex flex-col gap-1">
                        <CustomMenuBar 
                        trigger={<div className="text-[10px] flex items-center gap-2 opacity-70">Visibilty <ChevronDown size={15} /></div>} 
                        itemsList={[
                            [
                                {title: "Public",shortcut: <Eye />, callback: () => setVisibility("public")},
                                {title: "Private",shortcut: <EyeOff />, callback: () => setVisibility("private")}
                            ]
                        ]}
                        />
                        <input type="text" className="input" value={visibility}  />
                    </div>

                    {/* due date */}
                    <div className="flex flex-col gap-1">
                        <div className="text-[10px] opacity-70">Due Date</div>
                        <div className="flex items-center gap-4">
                            <input className="input-sm input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </div>
                    </div>

                     {/* start date */}
                    <div className="flex flex-col gap-1">
                        <div className="text-[10px] opacity-70">Start Date</div>
                        <div className="flex items-center gap-4">
                            <input className="input-sm input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-1">
                        <CustomMenuBar 
                        trigger={<div className="text-[10px] flex items-center gap-2 opacity-70">Status <ChevronDown size={15} /></div>}
                        itemsList={[
                            [
                                {title: "Active", callback: () => setStatus({status: "active", color: "green"})},
                                {title: "On Hold", callback: () => setStatus({status: "on-Hold", color: "blue"})},
                                {title: "Completed", callback: () => setStatus({status: "completed", color: "gray"})},
                                {title: "Archive", callback: () => setStatus({status: "archive", color: "gray"})},
                            ]
                        ]}
                        />
                        <StatusBadge status={status.status} color={status.color} />
                    </div>
                </div>

                {/* Description Textarea */}
                <div className="flex flex-col gap-3">
                    <div className="gap-4 flex text-sm items-center "><Rows4 size={15} />Description</div>
                    <div className="p-4">
                        <TipTapEditor />
                    </div>
                </div>

                {/* Attachment section */}
                <div id="task-detail-drawer-attachment" className="flex flex-col gap-3">
                    <div className="flex items-center gap-5">
                        <div className="gap-4 flex text-sm items-center "><Paperclip size={15} />Attachments</div>
                        <div>
                            <label htmlFor="pinned-file-upload"><div className="font-semibold text-sm flex gap-2 items-center p-2 hover:cursor-pointer rounded tras-bg-hover"><Plus size={15} /> Upload File </div></label>
                            <input type="file" id="pinned-file-upload" className="hidden" />
                        </div>
                    </div>
                    
                    <div className="p-4 flex items-center gap-3">
                        {selectedProject.pinnedFiles.length > 0 ? selectedProject.pinnedFiles.map(file => {
                            return <PinnedFileCard icon={<FileCodeIcon size={15} />} fileName={file.fileName} fileType={file.fileType} user={file.uploadedBy.username} createdAt={FormatDate(file.uploadedAt)} count={selectedProject.pinnedFiles.length} />
                        }) : <div>No pinned files</div>}
                    </div>
                </div>

                {/* submit botton */}
                <div className="flex gap-4 items-center">
                    <Button type="submit" className={`w-2/3`}>{isEditingProject ? <Loader2 className="animate-spin" /> : "Edit project"}</Button>
                    <DrawerClose className="w-1/3 btn-active"><Button className={`w-full`} variant={`outline`}>Cancel</Button></DrawerClose>
                </div>

                {/* small commands */}
                <div className="flex text-xs flex-wrap justify-between mb-5 gap-3">
                    <div className="flex items-center opacity-70 tras-bg-hover p-1.5 rounded hover:opacity-95 gap-3">
                        <Copy size={12} /> Duplicate </div>
                    <div className="flex items-center opacity-70 tras-bg-hover p-1.5 rounded hover:opacity-95 gap-3"><MoveUpRight size={12} /> Move </div>
                    <div className="flex items-center opacity-70 text-red-500 tras-bg-hover p-1.5 rounded hover:opacity-95 gap-3"><Trash2 size={12} /> Delete </div>
                </div>
            </form>               
        </ScrollArea>
        </DrawerContent>
    </Drawer> 
}