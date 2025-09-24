import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { memo, useEffect, useState } from "react"


export default function MembersChecklist({members : m, setSelectedMembers: ssm, format}){
    const [members, setMembers] = useState([...m, {username: "John", role: "project-admin", isSelected: false},
        {username: "Jane", role: "project-member", isSelected: false},
        {username: "Jill", role: "project-member", isSelected: false},
        {username: "Dave", role: "viewer", isSelected: false},])
    const [selectedMembers, setSelectedMembers] = useState([])

    useEffect(() => {
        const newSeletedMembers = members.filter(member => member.isSelected == true)
        setSelectedMembers(newSeletedMembers)
        ssm(newSeletedMembers)
    }, [members])

    const toggleMember = (username) => {
        const newMembers = members.map(member => {
            return member.username == username ? {...member, isSelected: !member.isSelected} : member
        })
        setMembers(newMembers)
    }
    const selectAll = () => {
        
        if (selectedMembers.length == members.length) {
            members.forEach(member => {
            member.isSelected = false
        })
        } else {
            members.forEach(member => {
            member.isSelected = true
        })
        }
        setMembers([...members])
    }

    const updateRole = (username, role) => {
        const newMembers = members.map(member => {
            return member.username == username ? {...member, role} : member
        })
        setMembers(newMembers)
    }
    

    return <div className={`flex gap-3 ${format == "ver" && "flex-col"} `}>
        <div onClick={() => selectAll()} className="flex items-center gap-3"><Checkbox checked={selectedMembers.length == members.length} id="select-all" /><label htmlFor="select-all">Select All</label></div>
        {
            members.map(member => {
                return <div className={`flex text-sm gap-4 ${format == "ver" && "justify-between"} bg-base-300 p-2 rounded items-center`}>
                    <div className="flex items-center gap-2">
                        <Checkbox className={`scale-90`} checked={member.isSelected} onCheckedChange={() => toggleMember(member.username)} />
                        <div>{member.username}</div>
                    </div>

                    {member.isSelected && 
                    <Select className="bg-light-200 text-xs "  value={member.role} onValueChange={(e) => updateRole(member.username, e)}>
                        <SelectTrigger className="flex items-center gap-2">
                            <SelectValue placeholder='Choose priority' />
                        </SelectTrigger>
                        <SelectContent className="border-0 bg-base-300">
                            <SelectGroup>
                                <SelectLabel className="text-muted text-xs">Role</SelectLabel>
                                <SelectItem value="project-admin">Admin</SelectItem>
                                <SelectItem value="project-member">Member</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>}
                </div>
            })
        }
    </div>
}