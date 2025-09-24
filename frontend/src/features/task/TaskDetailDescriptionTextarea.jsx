import { FilePlus, MoreHorizontal, Paperclip } from "lucide-react";


export default function TaskDetailDescriptionTextarea(){

    return <div className=" rounded border-2 border-gray-600">

        <div className=" bg-base-100 flex items-center justify-between rounded-t p-1 pl-3 pr-3">
            <div className="flex font-serif items-center gap-1">
                <div className="text-xl h-8 w-8 flex justify-center items-center font-bold bg-light-400-hover hover:cursor-pointer rounded">B</div>
                <div className="text-xl italic h-8 w-8 flex justify-center items-center bg-light-400-hover hover:cursor-pointer rounded">I</div>
                <div className="text-xl italic h-8 w-8 flex justify-center items-center font-bold bg-light-400-hover hover:cursor-pointer rounded"><FilePlus size={18} /></div>
                <div className="text-xl italic h-8 w-8 flex justify-center items-center font-bold bg-light-400-hover hover:cursor-pointer rounded"><Paperclip size={18} /></div>
            </div>
            <div>
                <MoreHorizontal />
            </div>
        </div>

        <div className="rounded-b-xl">
            <textarea style={{resize: "none"}} className="w-full bg-light-100 focus:outline-0 rounded-b border-0 p-4 h-40 focus:bg-base-100 textarea" placeholder="Description" id=""></textarea>
        </div>

        
    </div>
}