import { Badge } from "@/components/ui/badge";
import CircleProfileBadge from "./CircleProfileBadge";


export default function UserStatus({url, fallback, name, status, className}){

    return <div className={`flex tras-bg p-1 pl-2 pr-2 rounded items-center gap-2 ${className || ""}`}>
            <CircleProfileBadge url={url || ""} fallback={fallback || ""} /> <div>{name} - </div><div className="text text-sm">
                <Badge className={`bg-blue-600`}>{status}</Badge>
            </div>
        </div>
}