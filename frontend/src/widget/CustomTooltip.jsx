import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


export default function CustomTooltip({trigger, text}){

    return <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent className={`bg-black text-light-200`}>
            {text}
        </TooltipContent>
    </Tooltip>
}