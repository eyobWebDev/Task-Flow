import {config} from "dotenv"
import Invitation from "../../models/invite.model.js"
import Project from "../../models/project.model.js"
import User from "../../models/user.model.js"
import { getSocketId, io } from "../../config/socket.js"



config()

export const inviteMember = async (req, res) => {
    const {projectId, workspaceId, email, username, role, token} = req.body
    try {
        if(!projectId && !workspaceId) return res.status(400).json({message: "Workspace or project needed"})
        if(!email && !username) return res.status(400).json({message: "username or email needed"})
        const user = await User.findOne({username})
        if(!user) return res.status(404).json({message: "No user with that username."})
        const oldInvite = await Invitation.findOne({username, projectId, status: "pending"})
        if(oldInvite) return res.status(400).json({message: "Already sent an invite."})
        //TODO:"fast"-add to check if the user we are sending the invitations to is already sent

        const expiresAt = 7 * 24 * 60 * 60 * 1000
        const invitation = new Invitation({
            projectId, workspaceId, username, email, role, invitedBy: req.user._id, token, expiresAt: new Date(Date.now() + expiresAt)
        })

        await invitation.save()
        user.invitations.push(invitation._id)
        await user.save()
        console.log("user", user);

        const newInvite = await Invitation.findById(invitation._id).populate("projectId", "name").populate("invitedBy", "username fullName email profilePic")
        
        
        
        const invitee = await User.findById(user._id).populate({path: "lastActiveWorkspace", populate: [
            {path: "owner", select: "username email profilePic fullname"},
            {path: "members.user", select: "username email profilePic fullname"}
        ]}).populate({path: "lastActiveProject", populate: [
            {path: "createdBy", select: "username email profilePic fullname"},
            {path: "members.userId", select: "username email profilePic fullname"}
        ]}).populate({path: "invitations", populate: [
            {path: "invitedBy", select: "username email profilePic fullname"},
            {path: "projectId", select: "name milestones tasks members"},
            {path: "projectId.members.userId", select: "username email profilePic fullname"},
        ]})

        const recieverSocketId = getSocketId(user._id)
        if(recieverSocketId){
            io.to(recieverSocketId).emit("new-invite", {newInvite, invitee})
        }
        res.status(200).json({invitee, newInvite})
          
    } catch (e) {
        console.log("Error in invite member", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const acceptOrDeclineInvitations = async (req, res) => {
    const {accepted, token, projectId} = req.body
    try {
        const invitation = await Invitation.findOne({token})
        if(!invitation) return res.status(400).json({message: "Invalid token."})
        const project = await Project.findById(projectId)
        if(!project) return res.status(404).json({message: "No project found."})
        const username = invitation.username
        const userId = await User.findOne({username})
        if(project.members.includes(userId._id)) return res.status(403).json({message: "User already in the project."})
        if (accepted) {
            project.members.push({userId: userId._id, role: invitation.role, joinedAt: Date.now()})
            await project.save()

            const newProject = await Project.findById(project._id).populate({ path: "createdBy", select: "username fullName profilePic email" })
            .populate({ path: "members.userId", select: "username fullName profilePic email" })
            .populate({
            path: "tasks",
            populate: [
            {path: "assignee", select: "username email profilePic fullName"},
            { path: "activity.user", select: "username email profilePic fullName" }
            ]
            })
            res.status(200).json(newProject)

            const recieverSocketId = getSocketId(invitation.invitedBy)
            io.to(recieverSocketId).emit("new-member", newProject)
            
            invitation.status = "accepted"
            await invitation.save()

        } else {
            const newProject = await Project.findById(project._id).populate({ path: "createdBy", select: "username fullName profilePic email" })
            .populate({ path: "members.userId", select: "username fullName profilePic email" })
            .populate({
            path: "tasks",
            populate: [
            {path: "assignee", select: "username email profilePic fullName"},
            { path: "activity.user", select: "username email profilePic fullName" }
            ]
            })
            const recieverSocketId = getSocketId(invitation.invitedBy)
            io.to(recieverSocketId).emit("new-member-declined", {newProject, username})

            invitation.status = "declined"
            await invitation.save()
            res.status(401).json({message: "User declined the invitation."})
        }
        
    } catch (e) {
        console.log("Error in accept or decline an invitation", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
} 

export const getAllInvitations = async (req, res) => {
    try {
        const invitations = await Invitation.find({}).populate("invitedBy", "username").populate("projectId", "name")
        res.status(200).json(invitations)
    } catch (e) {
        console.log("Error in gettig all invitations", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
} 

export const removeMember = async (req, res) => {
    const {projectId, memberId, invitedBy, username} = req.body
    try {
        const project = await Project.findByIdAndUpdate(projectId, {
            $pull: {members: {_id: memberId}}
        }).populate({ path: "createdBy", select: "username fullName profilePic email" })
            .populate({ path: "members.userId", select: "username fullName profilePic email" })
            .populate({
            path: "tasks",
            populate: [
            {path: "assignee", select: "username email profilePic fullName"},
            { path: "activity.user", select: "username email profilePic fullName" }
            ]
        })
        const invitation = await Invitation.findOneAndDelete({invitedBy, projectId, username})
        if(invitation){
            await User.updateMany(
                { invitations: invitation._id },
                { $pull: { invitations: invitation._id } }
            )
        }
        res.status(200).json(project)
    } catch (e) {
        console.log("Error in remove member", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}
