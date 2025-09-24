import { File, FileDown, Paperclip, User } from "lucide-react";
import CustomTooltip from "./CustomTooltip";


export default function PinnedFileCard({icon, fileName, fileType, user, createdAt, count}){

    return <div className="bg-light-100 border-1 p-2 rounded">
        <div className="flex justify-between gap-4">
            <div className="flex gap-2 items-center">
                {icon || <File size={15} />}
                <div className="flex flex-col text-xs font-semibold">{fileName || "Anonymus"}
                    <div className="text-[8px] text-muted">{fileType || "txt"}</div>
                </div>  
            </div>
            <div>
                <CustomTooltip trigger={<FileDown size={20} className="p-1 rounded tras-bg-hover" />} text={`Download the file`} />
            </div>
        </div>

        <div className="flex text-[10px] justify-between mt-3 gap-3">
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><User size={12} /> {user || ""} {createdAt || ""}</div>
            <div className="flex items-center opacity-70 hover:opacity-95 gap-1"><Paperclip size={12} /> {count || 0}</div>
        </div>
    </div>
}