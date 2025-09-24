

export default function MyProfileSmallInfoBox({title, description, callback}){

    return <div onClick={callback} className="flex text-xs items-center justify-between gap-1 bg-base-100 p-1 pl-3 pr-4 rounded">
        <div className="opacity-80 ">{title}</div>
        <div className={`${callback && "underline text-blue-400 hover:cursor-pointer"}`}>{description}</div>
    </div>
}