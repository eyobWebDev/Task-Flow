import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function CircleProfileBadge({url, icon, fallback}){

    return <Avatar>
        <AvatarImage src={url} />
        <AvatarFallback className={`p-1 bg-light-200 shadow-2xl`}>{fallback?.toUpperCase()}</AvatarFallback>
    </Avatar>
}