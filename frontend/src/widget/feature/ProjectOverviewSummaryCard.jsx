

export default function ProjectOverviewSummaryCard({icon, label, primaryInfo, secondaryInfo, rightIcon, elements}){

    return <div className="flex flex-col hover:cursor-pointer gap-3 rounded tras-bg-100 p-2 border-t-3">
        <div className="flex justify-between items-center">
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