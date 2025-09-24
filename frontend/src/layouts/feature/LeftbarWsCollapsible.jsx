import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, LampDeskIcon } from "lucide-react"
import { useState } from "react"
import DashboardLeftMenuBarComponent from "./DashboardLeftMenuBarComponent"
import CircleProfileBadge from "@/widget/CircleProfileBadge"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"


export default function LeftbarWsCollapsible(){
    const [wsOpen, setWsOpen] = useState()
    const {myWorkspaces, selectedWorkspace} = useWorkspaceStore()

    return  <Collapsible  open={wsOpen}
        onOpenChange={setWsOpen}
        className="flex flex-col gap-2">
            <CollapsibleTrigger className="flex gap-4" >
                <div className="flex hover:cursor-pointer items-center gap-4">
                    <LampDeskIcon size={15} /><div>My Workspace</div>
                </div>
                {wsOpen ? <ChevronUp size={20} className="text-light-300" /> : <ChevronDown size={20} className="text-light-300" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
                <DashboardLeftMenuBarComponent
                elements={
                        myWorkspaces?.map(workspace => {
                            return {
                                icon: <CircleProfileBadge url={""} fallback={workspace?.name[0]} />,
                                text: workspace?.name,
                                status: selectedWorkspace == workspace
                            }
                        })
                    }
                
                />

            </CollapsibleContent>
    </Collapsible>
}