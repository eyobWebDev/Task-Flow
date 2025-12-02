

export default function ProjectOverviewSummaryCard({icon, label, primaryInfo, secondaryInfo, rightIcon, elements}){

    return <div className="flex flex-col hover:cursor-pointer gap-3 rounded drop-shadow-xl drop-shadow-gray-800 bg-light-200 p-2">

        <div className="flex bg-light-300 p-1 rounded justify-between items-center">
            <div className="flex items-center font-bold gap-2">{icon}<div className="text-sm">{label}</div></div>
            {rightIcon || ""}
        </div>

        <div className="text-xs flex font-semibold flex-col gap-1">
            <div>{primaryInfo}</div>
            <div>
                {secondaryInfo}
            </div>
        </div>
        {elements}
    </div>
}