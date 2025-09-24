import mongoose from "mongoose"

const workspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                role: {
                    type: String,
                    enum: ["owner", "admin", "member", "guest"],
                    default: "member"
                },
                invitedAt: {
                    type: Date,
                    default: Date.now
                },
                joinedAt: {
                    type: Date,
                }
            }
        ],
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project"
            }
        ]

    }, {timestamps: true}
)

const Workspace = mongoose.model("Workspace", workspaceSchema)

export default Workspace
