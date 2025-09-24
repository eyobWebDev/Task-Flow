import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import DashboardLeftMenuBarComponent from "@/layouts/feature/DashboardLeftMenuBarComponent"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"


export default function CustomCollapsible({trigger, shortAction, sub, items}){
    const [isOpen, setIsOpen] = useState(false)

    return <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col gap-2">

        {/* header to show the workspace name etc */}
        <div className="flex w-full bg-light-100 p-1 items-center justify-between">
            <CollapsibleTrigger className="flex hover:cursor-pointer text-sm text-muted items-center gap-2">
                {trigger}
                <div>
                    {isOpen ? <ChevronUp size={20} className="text-light-300" /> : <ChevronDown size={20} className="text-light-300" />}
                </div>
            </CollapsibleTrigger>

            {shortAction}
        </div>

        <CollapsibleContent className="pl-2 text-sm flex flex-col gap-2 text-light-300">
            {sub}
            {items?.map(item => {
                return  <div onClick={item.callback} className="flex p-1 rounded hover:bg-base-100 text-light-300 text-sm hover:cursor-pointer items-center gap-4">
                    {item.icon}<div >{item.name}<div className="text-[12px]">{item.status ? "Active" : ""}</div></div>
                </div>
            })}
        </CollapsibleContent>


    </Collapsible>
}