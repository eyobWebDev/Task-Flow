import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Form from "@/features/auth/Form";
import { Button } from "@/components/ui/button";
import { primary } from "@/assets/styles/colors";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function AuthLayout({title}){

    return <div className="flex w-full justify-center items-center h-[100vh] flex-col gap-4">
     <div className="flex lg:border md:border md:w-130 lg:p-10 md:p-7 p-3 rounded-2xl border-gray-500 lg:w-180 w-80 flex-col gap-4">
        <div className="flex flex-col gap-2">
            <h2 className={`text-center`}>{title}</h2>
            <div className={`text-center opacity-70`}>Please {title} to continue using the app!</div>
        </div>
        <Form title={title} />
    </div>
    </div>
}