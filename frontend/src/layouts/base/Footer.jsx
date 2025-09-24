import { Button } from "@/components/ui/button";
import { Copyright } from "lucide-react";

export default function Footer() {
    
    return <>
    <div className="p-15 mt-10 bg-base-300">
        <div className="flex gap-5 justify-between">
            <div className="w-100">
                <div className="text-3xl text-gradient mb-3">TaskFlow</div>
                <div className="font-light opacity-80">Full project and team management. create workspace and invite people to collaborate, schedule task with due date etc...</div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <h1 className="font-bold lg:text-2xl sm:text-[12px]">Quick links</h1>
                <div className="flex flex-col gap-2 items-center">
                    <div className="hover:text-blue-400">Home</div>
                    <div className="hover:text-blue-400">About</div>
                    <div className="hover:text-blue-400">Settings</div>
                    <Button className={`cursor-pointer`} >Get started</Button>
                </div>
            </div>
        </div>

        <div className="h-[2px] m-4 bg-base-100 w-full"></div>

        <div style={{fontSize: "smaller"}} className="flex gap-4 mt-4 text-gray-400 justify-between">
            <div className="flex gap-3 items-center"><Copyright size={20} /> <div>2025 TaskFlow alright reserved.</div></div>
            <div>
                <div>Privacy Policy Terms of Service</div>
            </div>
        </div>
    </div>
    </>
}