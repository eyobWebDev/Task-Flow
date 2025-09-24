import { Grid, ListFilterIcon, PencilLine, Plus, Rows3Icon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomBadge from "@/widget/feature/CustomBadge";
import CustomGroupBadge from "@/widget/feature/CustomGroupBadge";
import { useEffect, useState } from "react";
import CustomMenuBar from "@/widget/CustomMenuBar";
import { NavLink } from "react-router-dom";

export default function WorkspaceHeader(){
    

    return <div className="lg:p-5 z-10 bg-base-100 sticky top-0 p-2 flex flex-col gap-5">
        <div className="flex items-center justify-between">
            <div className="lg:text-2xl font-bold text-xl">My Workspaces</div>

            <div className="flex gap-5">
                <Search size={25} className="rounded bg-light-400-hover p-1" />
                <CustomMenuBar label={`Filter by`} trigger={<ListFilterIcon size={25} className="rounded bg-light-400-hover p-1" />} itemsList={[
                    [{title: "Admin"},
                    {title: "Members only"},]
                ]} />
            </div>
        </div>

        <div className="flex justify-between p-1">

            <CustomGroupBadge
                badges={[
                    {icon: <Grid size={15}/>, title: "Grid"},
                    {icon: <Rows3Icon size={15}/>, title: "Row"}
                ]}
            />

            <div>
                <NavLink className={``} to={`/workspace/new`}>
                <Button className={`flex hover:cursor-pointer gap-3`}>
                    <Plus size={20} />
                    <div>New Workspace</div>
                </Button>
                </NavLink>

            </div>

        </div>
    </div>
}