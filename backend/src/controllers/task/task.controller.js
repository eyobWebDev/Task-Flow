import Task from '../../models/task.model.js';
import Project from '../../models/project.model.js';
import path from 'path';


export const createTask = async (req, res) => {
    const {title, description, assignee, dueDate, priority, projectId} = req.body
    
    try {
        const project = await Project.findById(projectId)
        if (!project) return res.status(404).json({message: "project with that name already exists."})
        
        const newTask = new Task({
            title, projectId, description, assignee, dueDate, priority, activity: [{
                action: "created",
                user: req.user._id,
                message: `${req.user.username} added new task to "${project.name}" project`,
                createdAt: Date.now()
            }]
        })

        await newTask.save()        
        project.tasks.push(newTask)
        await project.save()
        const newProject = await Project.findById(project._id).populate("members.userId", "username email fullName profilePic").populate("createdBy", "username email fullName profilePic").populate({path: "tasks", populate:
            {path: "assignee", select: "username profilePic email fullName"}
        })

        const createdTask = await Task.findById(newTask._id).populate("activity.user", "username email fullName profilePic").populate("assignee", "username email fullName profilePic")

        res.status(201).json({newProject, createdTask})
    } catch (e) {
        console.log("Error in creating task", e.message)
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
        
        const editedProject = await Project.findById(project._id).populate("members.userId", "username email fullName profilePic").populate("createdBy", "username email fullName profilePic")
        res.status(200).json(editedProject)
    } catch (e) {
        console.log("Error in editing project", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getMyProjects = async (req, res) => {
    const {workspaceId} = req.query
    
    try {
        const project = await Project.find({workspaceId}).populate("createdBy", "username fullName profilePic email")
        .populate("members.userId", "username fullName profilePic email")
        
        res.status(200).json(project)
    } catch (e) {
        console.log("Error in getting my projects", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const deleteTask = async (req, res) => {
    const {taskId, projectId} = req.body
    
    try {
        const project = await Task.findByIdAndDelete(taskId)
        const newProject = await Project.findByIdAndUpdate(projectId, {$pull: {tasks: {_id: taskId}}}, {new: true}).populate({ path: "createdBy", select: "username fullName profilePic email" })
        .populate({ path: "members.userId", select: "username fullName profilePic email" })
        .populate({
            path: "tasks",
            populate: [
            {path: "assignee", select: "username email profilePic fullName"},
            { path: "activity.user", select: "username email profilePic, fullName" }
            ]
        });
        console.log("task deleted succesfully");
        res.status(200).json({message: "Deleted Succesfully.", newProject, taskId})
    } catch (e) {
        console.log("Error in deleting my projects", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const changeStatus = async (req, res) => {
    const {taskId, status} = req.body
    
    try {
        //TODO:task-activity logging
        const task = await Task.findByIdAndUpdate(taskId, {$set: {status: status}}, {new: true}).populate("assignee", "username email profilePic fullName").populate("activity.user", "username email profilePic fullName")

        const newProject = await Project.findOne({tasks: taskId}).populate({ path: "createdBy", select: "username fullName profilePic email" })
        .populate({ path: "members.userId", select: "username fullName profilePic email" })
        .populate({
            path: "tasks",
            populate: [
            {path: "assignee", select: "username email profilePic fullName"},
            { path: "activity.user", select: "username email profilePic, fullName" }
            ]
        });
        console.log("task", task);
        console.log("newProject", newProject);
                
        res.status(200).json({task, newProject})
    } catch (e) {
        console.log("Error in changing task status", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const changePriority = async (req, res) => {
    const {taskId, priority} = req.body
    
    try {
        //TODO:task-activity logging
        const task = await Task.findByIdAndUpdate(taskId, {$set: {priority: priority}}, {new: true}).populate("assignee", "username email profilePic fullName").populate("activity.user", "username email profilePic fullName")
        
        const newProject = await Project.findOne({tasks: taskId}).populate({ path: "createdBy", select: "username fullName profilePic email" })
        .populate({ path: "members.userId", select: "username fullName profilePic email" })
        .populate({
            path: "tasks",
            populate: [
            {path: "assignee", select: "username email profilePic fullName"},
            { path: "activity.user", select: "username email profilePic, fullName" }
            ]
        });
        console.log("task", task);
        console.log("newProject", newProject);
                
        res.status(200).json({task, newProject})
    } catch (e) {
        console.log("Error in changing task priority", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}


