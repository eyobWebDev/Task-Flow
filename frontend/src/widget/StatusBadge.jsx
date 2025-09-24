

export default function StatusBadge({color, status}){

    return <div className="flex text-xs p-1 rounded pl-2 pr-2 tras-bg items-center gap-2">
        <div className={`h-3 w-3 rounded-full bg-${color}-500 `}></div>
        <div className={`text-${color}-200 font-bold`}>{status}</div>
    </div>
}