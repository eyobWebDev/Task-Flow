

export default function MyProfileInfoBox({title, description, callback}){

    return <div onClick={callback} className="flex flex-col gap-1 bg-base-100 p-1 pl-2 rounded">
        <div className="text-[10px] text-muted">{title}</div>
        <div className="text-sm">{description}</div>
    </div>
}