import mongoose from "mongoose"

const activitySchema = new mongoose.Schema(
    {
        action: {
            type: String,
            enum: ["created", "updated", "statusChanged","commented", "priorityChanged", "assigneeChanged", "dueDateChanged", "subtaskAdded", "subtaskCompleted", "subtaskRemoved"],
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {_id: false}
)


const taskSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },

        //ownership
        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"    
            },
        ],

        //status and priority
        status: {
            type: String,
            enum: ["todo", "in-progress", "done", "review"],
            default: "todo"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "todo"
        },

        //timing
        dueDate: Date,
        startDate: Date,
        completedAt: Date,

        //subtask
        subtasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subtask"
            }
        ],

        //files
        attachments: [
            {
                name:  String,
                url:  String,
                type: String,
                uploadedBy: {type : mongoose.Schema.Types.ObjectId, ref: "User"},
                uploadedAt: {type:  Date, default: Date.now}
            }
        ],

        //comment
        comments: [
            {
                author: {type : mongoose.Schema.Types.ObjectId, ref: "User"},
                text: String,
                createdAt: {type:  Date, default: Date.now}
            },
        ],

        //activity
        activity: [activitySchema],

        //flags
        isPinned: {type: Boolean, default: false},
        isArchived: {type: Boolean, default: false}
    }, {timestamps: true}
)


const Task = mongoose.model("Task", taskSchema)

export default Task