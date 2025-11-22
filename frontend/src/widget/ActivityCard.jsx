import { ScrollArea } from "@/components/ui/scroll-area"


export default function ActivityCard({icon, title, content, items}){

    return <ScrollArea className="drop-shadow-2x1 p-2 drop-shadow-gray-700 h-40 bg-light-100 rounded shadow-xl flex flex-col gap-1">
        <div className="text-center sticky top-0 z-5 rounded p-2 bg-base-200 text-sm flex gap-2 font-bold items-center">
            {icon || ""}{title}</div>
        
        <div className="flex flex-col p-3 pl-5 gap-1 font-semibold text-xs text-blue-200 opacity-70">
            {content || ""}
            {items?.map(item => {
                return <li>{item}</li>
            })}
        </div>
    </ScrollArea>
}