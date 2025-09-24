import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function StackedAvatar({avatars, size}){

    return<div className="flex mt-1 items-center gap-1">
            <div className="*:data-[slot=avatar]:ring-background  flex -space-x-2 *:data-[slot=avatar]:ring-1 *:data-[slot=avatar]:grayscale">
            {avatars && 
                avatars.slice(0, 3).map(avatar => {
                    return <Avatar className={`h-6 w-6 ${size == "small" && "h-5 w-5 text-sm"} ${size == "big" && "h-8 w-8"}  bg-light-200`}>
                        <AvatarImage src={avatar?.src || ""} />
                        <AvatarFallback className={`${size == "small" && "text-[12px]"} ${size == "big" && "text-xl"} flex justify-center items-center`}>{avatar?.alt || ""}</AvatarFallback>
                    </Avatar>
                })
            }
            
        </div>
            <div className={`${size == "small" && "text-[12px]"} `}>{avatars?.length > 3 && <div> + {avatars.length - 3}more.</div>}</div>
    </div>
}