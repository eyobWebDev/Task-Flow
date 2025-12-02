import { Grid, ListFilterIcon, PencilLine, Plus, Rows3Icon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomBadge from "@/widget/feature/CustomBadge";
import CustomGroupBadge from "@/widget/feature/CustomGroupBadge";
import { useEffect, useState } from "react";
import CustomMenuBar from "@/widget/CustomMenuBar";
import { NavLink } from "react-router-dom";

export default function WorkspaceHeader(){
    

    return <div className="lg:p-5 z-10 sticky top-0 p-2 flex flex-col gap-5">

        {/* top part: name and search bar with filter */}
        <div className="flex items-center justify-between">
            <div className="lg:text-2xl font-bold text-xl">My Workspaces</div>

            <div className="flex gap-5">
                {/* search bar */}
                <div className="flex items-center gap-3 relative w-60">
                    <input type="text" className="input p-3.5 rounded-2xl input-xs focus:border-gray-600 focus:outline-none absolute w-full" 
                    placeholder="Search workspace by name . . . "
                    />
                    <Search size={25} className="rounded-full absolute right-1 bg-light-200 z-2 p-1" />
                </div>

                {/* filter menu bar */}
                <CustomMenuBar label={`Filter by`} trigger={<ListFilterIcon size={25} className="rounded bg-light-400-hover p-1" />} itemsList={[
                    [{title: "Admin"},
                    {title: "Members only"},]
                ]} />
            </div>
        </div>

        {/* bottom part: grid/row switch and create button */}
        <div className="flex justify-between items-center p-1">

            <CustomGroupBadge
                badges={[
                    {icon: <Grid size={15}/>, title: "Grid"},
                    {icon: <Rows3Icon size={15}/>, title: "Row"}
                ]}
            />

            <div>
                {/* create workspace button */}
                <NavLink className={``} to={`/workspace/new`}>
                    <button className={`flex hover:cursor-pointer lg:btn btn btn-sm btn-primary gap-3`}>
                        <Plus size={20} />
                        <div>New Workspace</div>
                    </button>
                </NavLink>

            </div>

        </div>
    </div>
}