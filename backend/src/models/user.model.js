import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true,
            minLength: 6    
        },
        role: { 
            type: String, 
            enum: ["user", "admin", "member", "guest"], 
            default: "user" 
        },
        fullName: {
            type: String
        },
        profilePic: {
            type: String,
            default: ""
        }
    }, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User