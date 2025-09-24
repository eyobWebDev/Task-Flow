import { Badge } from "@/components/ui/badge";


export default function ProjectHeaderRightElement(){

    return <div className="flex  items-center gap-5">
        <div className="flex text-sm items-center gap-3"><Badge className={`scale-80`} variant={`outline`}>Active</Badge></div>

        <div className="text-3xl">
            Project Name
        </div>
    </div>
}