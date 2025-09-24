import { ScrollArea } from "@/components/ui/scroll-area"


export default function ActivityCard({icon, title, content, items}){

    return <ScrollArea className=" h-40 bg-light-100 rounded shadow-xl border-l-2 flex flex-col gap-1">
        <div className="text-center sticky top-0 z-5 rounded-t-xl p-2 bg-base-200 text-sm flex gap-2 font-bold items-center">
            {icon || ""}{title}</div>
        <div className="flex flex-col p-3 pl-3 gap-1 font-semibold text-xs text-blue-200 opacity-70">
            {content || ""}
            {items?.map(item => {
                return <li>{item}</li>
            })}
        </div>
    </ScrollArea>
}