import Project from '../../models/project.model.js';


export const addMilestone = async (req, res) => {
    const {title, description, projectId, dueDate} = req.body
    console.log("re.body", req.body);

    try {
        console.log("adding milestone");
        const newProject = await Project.findByIdAndUpdate(projectId, {
            $push: {milestones: {title, description, dueDate}}
        })
        newProject.activityLog.push({
            action: `Milestone added`,
            userId: req.user._id,
            message: `${req.user.username} added new milestone`
        })
        await newProject.save()

        const project = await Project.findById(newProject._id).populate("members.userId", "username email fullName profilePic").populate("createdBy", "username email fullName profilePic").populate({path: "tasks", populate: {
            path: "assignee", select: "username profilePic email fullName"
        }})
        res.status(200).json(project)
        
    } catch (e) {
        console.log("Error in adding milestone conrroller", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const removeMilestone = async (req, res) => {
    const {projectId, milestoneId} = req.body

    try {
        const newProject = await Project.findById(projectId)
        const milestone = newProject.milestones.id(milestoneId)
        newProject.activityLog.push({
            action: `Milestone deleted`,
            userId: req.user._id,
            message: `${req.user.username} Removed milestone`
        })
        await milestone.deleteOne()
        await newProject.save()

        const project = await Project.findById(newProject._id).populate("members.userId", "username email fullName profilePic").populate("createdBy", "username email fullName profilePic").populate({path: "tasks", populate: {
            path: "assignee", select: "username profilePic email fullName"
        }})
        res.status(200).json(project)
        
    } catch (e) {
        console.log("Error in removing milestone controller", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const toggleMilestoneComplete = async (req, res) => {
    const {projectId, milestoneId} = req.body

    try {
        const newProject = await Project.findById(projectId)
        const milestone = newProject.milestones.id(milestoneId)
        milestone.isComplete = !milestone.isComplete
        newProject.activityLog.push({
            action: `Milestone ${milestone.isComplete ? "completed" : "Incompleted"}`,
            userId: req.user._id,
            message: `${req.user.username} changed the milestone status from ${milestone.isComplete ? "Incomplete" : "Complete"} to ${milestone.isComplete ? "Complete" : "Incomplete"}`
        })
        await newProject.save()

        const project = await Project.findById(newProject._id).populate("members.userId", "username email fullName profilePic").populate("createdBy", "username email fullName profilePic").populate({path: "tasks", populate: {
            path: "assignee", select: "username profilePic email fullName"
        }})
        res.status(200).json(project)
    } catch (e) {
        console.log("Error in toggling completing milestone controller", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}