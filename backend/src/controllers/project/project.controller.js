import Project from '../../models/project.model.js';
import Task from '../../models/task.model.js';
import User from '../../models/user.model.js';


export const createProject = async (req, res) => {
    const {name, description, workspaceId} = req.body
    
    try {
        const project = await Project.findOne({name})
        if (project) return res.status(400).json({message: "project with that name already exists."})
        
        const newProject = new Project({
            name, description, createdBy: req.user._id, workspaceId, members: [{
                userId: req.user._id,
                role: "project-owner"
            }]
        })


        await newProject.save()
        const createdProject = await Project.findById(newProject._id).populate("members.userId", "username email fullName profilePic").populate("createdBy", "username email fullName profilePic").populate({path: "tasks", populate: {
            path: "assignee", select: "username profilePic email fullName"
        }})
        res.status(201).json(createdProject)
    } catch (e) {
        console.log("Error in creating project", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const editProject = async (req, res) => {
    const {name, description, status, visibility, projectId, dueDate, startDate} = req.body
    
    try {
        const project = await Project.findByIdAndUpdate(projectId, {
            name, description, status, visibility, dueDate, startDate
        }, {new: true})
        if (!project) return res.status(404).json({message: "project with that name already exists."})
        
        const editedProject = await Project.findById(project._id).populate("members.userId", "username email fullName profilePic").populate("createdBy", "username email fullName profilePic").populate({path: "tasks", populate: {
            path: "assignee", select: "username profilePic email fullName"
        }})
        res.status(200).json(editedProject)
    } catch (e) {
        console.log("Error in editing project", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getMyProjects = async (req, res) => {
    const {workspaceId} = req.query
    
    try {
        const project = await Project.find({workspaceId}).populate({ path: "createdBy", select: "username fullName profilePic email" })
        .populate({ path: "members.userId", select: "username fullName profilePic email" })
        .populate({
            path: "tasks",
            populate: [
            {path: "assignee", select: "username email profilePic fullName"},
            { path: "activity.user", select: "username email profilePic fullName" }
            ]
        });
        console.log("projects", project);
        res.status(200).json(project)         
    } catch (e) {
        console.log("Error in getting my projects", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const deleteProject = async (req, res) => {
    const {projectId} = req.query
    
    try {
        const project = await Project.findByIdAndDelete(projectId)
        res.status(200).json({message: "Deleted Succesfully."})
    } catch (e) {
        console.log("Error in deleting my projects", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}


