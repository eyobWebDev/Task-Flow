import WorkspaceForm from "./WorkspaceForm";


export default function CreateWorkspaceForm(){

    return <div className="flex w-full justify-center items-center h-[100vh]  gap-4">
         <div className="flex lg:border md:border md:w-130 lg:p-10 md:p-7 p-3 rounded-2xl border-gray-500 lg:w-200 w-80 flex-col gap-4">

            {/* Header */}
            <div className="flex flex-col gap-2">
                <h2 className={`text-center text-2xl`}>Create Workspace</h2>
                <div className={`text-center opacity-70`}>A workspace is where yoour team collaborates on projects, tasks and milestone!</div>
            </div>

            {/*  workspace form */}
            <WorkspaceForm />
        </div>

        {/* user's role description 
        <div className="text-muted ms-10 p-2 bg-light-200 border-gray-500 border rounded">
            <div className="text-[15px]">User roles</div>

           <div className="p-3 text-[12px]">
                 <div>Owner - Full control</div>
                 <div>Admin - Manage workspace + members</div>
                 <div>Members - Collaborate on projects</div>
                 <div>Guest - View Only</div>
           </div>
        </div> */}

    </div>
}