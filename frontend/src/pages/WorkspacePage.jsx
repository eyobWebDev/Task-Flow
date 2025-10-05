import { Button } from "@/components/ui/button";
import WorkspaceHeader from "@/layouts/feature/WorkspaceHeader";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import WorkspaceBox from "@/widget/feature/WorkspaceBox"
import SpinAnimate from "@/widget/SpinAnimate";
import { Loader2, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


export default function WorkspacePage(){
    const {isGettingWorkspaces, getWorkspaces, currentBadge, myWorkspaces, isCreatingWorkspace} = useWorkspaceStore()
    console.log(myWorkspaces);
    

    useEffect(() => {
        getWorkspaces()
    }, [])


    const style = currentBadge == "Grid" ? "grid lg:p-10 p-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2" : "flex lg:p-10 p-4 flex-col"
    
    return <>
        <WorkspaceHeader />
        { isGettingWorkspaces || isCreatingWorkspace ? <SpinAnimate text={`Getting Workspaces...`} />
         :
            <div className={`${style} gap-5`}>
                
                {myWorkspaces.length > 0 ?
                    myWorkspaces.map(workspace => {
                        return <WorkspaceBox workspace={workspace} />
                    }) :
                    <div className="mt-10 w-full flex justify-center items-center">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5"><Users /><h1>You aren't member of any Workflow</h1></div>
                            <NavLink to={`/workspace/new`} className={`w-full`}><Button className={`flex gap-3`}><Plus /><div>Create Your First Workspace</div></Button></NavLink>
                        </div>
                    </div>
                }
            </div>
        }
    </>
}