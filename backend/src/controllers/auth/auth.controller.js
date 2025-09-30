import {config} from "dotenv"
import User from "../../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../../config/utils.js"
import cloudinary from "../../config/cloudinary.js"


config()

export const signup = async (req, res) => {
    const {username, password } = req.body
    try {
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 charachter."})
        }
       const user = await User.findOne({username})
       if(user) return res.status(400).json({message: "User with that username alredy exists"})
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            password: hashedPassword
        })
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json(newUser)
        } else {
            res.status(400).json({message: "Invalid credentials."})
        }
    } catch (e) {
        console.log("Error creating user", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const login = async (req, res) => {
    const {username, password } = req.body
    
    try {
        const user = await User.findOne({username})
        if (!user) return res.status(400).json({message: "Invalid credentials."})
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."})
        
        generateToken(user._id, res)
        res.status(200).json(user)
    } catch (e) {
        console.log("Error logging user in", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
    
}

export const checkAuth = async (req, res) => {
    try{  
        console.log("checking auth", req.user);
            
        const user = await User.findById(req.user._id).populate({path: "lastActiveWorkspace", populate: [
            {path: "owner", select: "username email profilePic fullname"},
            {path: "members.user", select: "username email profilePic fullname"}
        ]}).populate({path: "lastActiveProject", populate: [
            {path: "createdBy", select: "username email profilePic fullname"},
            {path: "members.userId", select: "username email profilePic fullname"}
        ]}).populate({path: "invitations", populate: [
            {path: "invitedBy", select: "username email profilePic fullname"},
            {path: "projectId", select: "name milestones tasks members"},
        ]})
        console.log("auth checked: auth user", user);
        
                
        res.status(200).json(user)
    } catch (e){
        console.log("Error in check auth", e.message)
        res.status(500).json({message: "InternalError"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out succesfully"})
    } catch (e) {
        console.log("Error logging out user", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const updateProfilePic = async (req, res) => {
    try {
        const { profilePic } = req.body
       const userId = req.user._id
       
       if(process.env.NODE_ENV != "development") {
        const cloudinaryRes = await cloudinary.uploader.upload(profilePic)
        const newUser = await User.findByIdAndUpdate(userId, {profilePic : cloudinaryRes.secure_url}, {new: true})
        res.status(200).json(newUser)
        return
       }  
 
        const newUser = await User.findByIdAndUpdate(userId, {profilePic}, {new: true})
        res.status(200).json(newUser)
    } catch (e) {
        console.log("Error in Upload profile controller", e)
        res.status(500).json({message: "Internal server error."})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const data = req.body
        const userId = req.user._id
        const newUser = await User.findByIdAndUpdate(userId, data, {new: true})
        res.status(200).json(newUser)
    } catch (e) {
        console.log("Error in update profile controller", e)
        res.status(500).json({message: "Internal server error."})
    }
}

export const searchUser = async (req, res) => {
    const {q} = req.query
    if(!q) return res.json({})
    
    const regex = new RegExp(q, "i")

    const users = await User.find({
        $or:[
            {username: regex},
            {email: regex}
        ]
    }).limit(20).select("fullName email profilePic");

    res.json(users)
}

export const updateLastActive = async (req, res) => {
    const {workspaceId, projectId} = req.body
    
    try {
        const update = {}
        if (workspaceId) update.lastActiveWorkspace = workspaceId
        if (projectId) update.lastActiveProject = projectId
        
        const user = await User.findByIdAndUpdate(req.user._id, {$set: update}).populate({path: "lastActiveWorkspace", populate: [
            {path: "owner", select: "username email profilePic fullname"},
            {path: "members.user", select: "username email profilePic fullname"}
        ]}).populate({path: "lastActiveProject", populate: [
            {path: "createdBy", select: "username email profilePic fullname"},
            {path: "members.userId", select: "username email profilePic fullname"}
        ]}) 
        res.status(200).json(user)
    } catch (e) {
        console.log("Error in UpdateLastActiv", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}
