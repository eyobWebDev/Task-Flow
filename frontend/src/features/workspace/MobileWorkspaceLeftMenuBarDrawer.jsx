import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import WorkspaceLeftMenuBar from "./WorkspaceLeftMenuBar";


export default function MobileWorkspaceLeftMenuBarDrawer({trigger}){

    return <Drawer direction="left">
        <DrawerTrigger>{trigger}</DrawerTrigger>
        
        <DrawerContent className={`bg-light-100`}>
            <div className="">
                <WorkspaceLeftMenuBar state={true} />
            </div>
        </DrawerContent>
    </Drawer>
}