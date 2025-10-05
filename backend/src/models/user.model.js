import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            unique: true,
            sparse: true,
            default: null
        },
        password: { 
            type: String, 
            required: true,
            minLength: 6    
        },
        fullName: {
            type: String
        },
        profilePic: {
            type: String,
            default: ""
        },
        lastActiveWorkspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            default: null
        },
        lastActiveProject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            default: null
        },
        invitations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Invitation"
            }
        ]
    }, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User