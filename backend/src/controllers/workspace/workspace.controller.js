import Workspace from '../../models/workspace.model.js';


export const createWorkspace = async (req, res) => {
    const {name, description } = req.body
    
    try {
        const workspace = await Workspace.findOne({name})
        if (workspace) return res.status(400).json({message: "Workspace with that name already exists."})
        
        const newWorkspace = new Workspace({
            name, description, owner: req.user._id, members: [{
                user: req.user._id,
                role: "owner"
            }]
        })
        await newWorkspace.save()
        const createdWs = await Workspace.findById(newWorkspace._id).populate("members.user", "username email fullName profilePic")
        res.status(201).json(createdWs)
    } catch (e) {
        console.log("Error in creating workspace", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const getMyWorkspace = async (req, res) => {
    
    try {
        console.log("req.user", req.user);
        const workspace = await Workspace.find({owner: req.user._id}).populate("owner", "username fullName profilePic email")
        .populate("members.user", "username fullName profilePic email")
        
        res.status(200).json(workspace)
    } catch (e) {
        console.log("Error in getting my workspace", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}


