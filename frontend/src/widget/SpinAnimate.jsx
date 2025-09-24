import { Loader2 } from "lucide-react";


export default function SpinAnimate({text}){

    return <div className="flex mt-10 w-full justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5">
            <div>{text}</div>
            <Loader2 size={64} className="animate-spin text-blue-500" />
        </div>
    </div>
}