import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { ChevronRight } from "lucide-react"


export default function CustomMenuBar({trigger, label, content_style, itemsList}){

    return <DropdownMenu>
        <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
            {trigger || <Button variant={`outline`}>Open</Button>}
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`w-full border-0 text-light-200 bg-light-200 ${content_style || ""}`}>
            <DropdownMenuLabel className={`text-muted text-sm`}>{label || ""}</DropdownMenuLabel>
                {
                    itemsList.map(items => {
                        return <><DropdownMenuGroup>
                            {items &&
                                items.map(item => {
                                    return<> {item?.subs ? <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="hover:cursor-pointer text-[12px] bg-light-400-hover flex items-center gap-1">
                                                <div>{item.title || <Button variant={`outline`}>Open</Button>}
                                                </div>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent className={` w-full border-0 text-light-200 bg-light-100`}>
                                                    {
                                                        item.subs?.map(sub => {
                                                            return <DropdownMenuItem className={`hover:cursor-pointer text-[10px] bg-light-400-hover`} onClick={sub.callback}>{sub.name}</DropdownMenuItem>
                                                        })
                                                    }
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub> : <DropdownMenuItem onClick={item.callback} className={`text-[12px] hover:cursor-pointer bg-light-400-hover`}>
                                        {item.title || ""}
                                        <DropdownMenuShortcut>{item.shortcut || ""}</DropdownMenuShortcut>
                                    </DropdownMenuItem> } </>
                                })}
                        </DropdownMenuGroup><DropdownMenuSeparator /></>
                    })
                } 
        </DropdownMenuContent>
    </DropdownMenu>
}