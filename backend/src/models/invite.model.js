import mongoose from "mongoose"

const invitationSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },
        email: {
            type: String,
        },
        username: {
            type: String,
        },

        //ownership
        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        //status and priority
        status: {
            type: String,
            enum: ["pending", "accepted", "declined", "expired"],
            default: "pending"
        },
        role: {
            type: String,
            enum: ["project-admin", "project-member", "viewer"],
            default: "member"
        },

        //flags
        token: {type: String, required: true},
        expiresAt: {type: Date}
    }, {timestamps: true}
)


const Invitation = mongoose.model("Invitation", invitationSchema)

export default Invitation
