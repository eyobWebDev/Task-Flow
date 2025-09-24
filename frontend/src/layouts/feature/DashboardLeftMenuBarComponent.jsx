import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { NavLink } from "react-router-dom"


export default function DashboardLeftMenuBarComponent({title, elements}){
    const {selctedWorkspace} = useWorkspaceStore()

    return <div className="p-2 flex flex-col gap-4">
        {title && <div className="text-muted text-[12px]">{title}</div>}

        <div className="flex gap-1 flex-col">
        {
            elements.map(element => {
                return <NavLink onClick={element.callback} to={element.route?.startsWith("/") ? element.route : `/workspace/${selctedWorkspace?._id}/projects/${element.route || ""}`} className="flex p-1 rounded hover:bg-base-100 text-light-300 text-sm hover:cursor-pointer items-center gap-4">
                    {element.icon}<div >{element.text}<div className="text-[12px]">{element.status ? "Active" : ""}</div></div>
                </NavLink>
            })
        }
        </div>
    </div>
}