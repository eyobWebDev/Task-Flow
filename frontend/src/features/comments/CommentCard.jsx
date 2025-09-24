import StackedAvatar from "@/widget/feature/StackedAvatar";


export default function CommentCard({user, createdAt, comment}){

    return <div className="flex gap-5 p-1 pl-3 pr-4 items-center rounded bg-light-100 border-gray-500 border">
        <div className="flex text-[11px] items-center gap-1">
            <StackedAvatar size={`small`} avatars={[{alt: user[0].toUpperCase()}]} />
            <div className="flex flex-col">
                <div>{user}</div>
                <div className="flex gap-1 text-[8px]">{createdAt}</div>
            </div>
        </div>

        <div className="text-sm break-words">
            {comment}
        </div>
    </div>
}