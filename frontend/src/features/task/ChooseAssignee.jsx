import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RadioItem } from "@radix-ui/react-menubar"


export default function ChooseAssignee({members, setAssignee, assignee}){


    return <RadioGroup value={assignee} onValueChange={setAssignee} className={`flex flex-col gap-2`}>
        
        {members.map(member => {
            return <div className="flex items-center bg-base-300 p-2 rounded gap-3"><RadioGroupItem value={member.userId._id} /> {member.userId.username}</div>
        })}
    </RadioGroup>
}