import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
    {
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        members: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                role: {
                    type: String,
                    enum: ["project-owner", "project-admin", "project-member", "viewer"],
                    default: "project-member"
                },
                joinedAt: {
                    type: Date,
                    default: Date.now
                }
            },
        ],
        status: {
            type: String,
            enum: ["active", "on-hold", "completed", "archive"],
            default: "active"
        },
        startDate: Date,
        dueDate: Date,
        milestones: [
            {
                title: String,
                description: String,
                dueDate: Date,
                isComplete: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ],
        pinnedFiles: [
            {
                fileName:  String,
                fileUrl:  String,
                fileType: String,
                uploadedBy: {type : mongoose.Schema.Types.ObjectId, ref: "User"},
                uploadedAt: {type:  Date, default: Date.now}
            }
        ],
        activityLog: [
            {
                action: String,
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                message: String,
                timestamp: {
                    type: Date,
                    default: Date.now
                },
            },
        ],
        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "public"
        }
    }, {timestamps: true}
)


const Project = mongoose.model("Project", projectSchema)

export default Project