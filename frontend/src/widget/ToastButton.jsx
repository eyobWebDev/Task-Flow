import { Button } from "@/components/ui/button"
import { toast, Toaster } from "sonner"
import { errorToaster, successToaster } from "./toaster"


export default function ToastButton({text, header, description, label}){

    return <>
        <Button
        className={`text-base-content bg-base-300 hover:bg-white/10`}
        variant="outline"
        
        onClick={() => errorToaster(header, description, label)}
        >
      {text}
    </Button>
    </>
}