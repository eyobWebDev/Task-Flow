import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },
        
        //info
        title: {type: String, required: true},
        description: {type: String, default: ""},

        //status 
        status: {
            type: String,
            enum: ["todo", "in-progress", "done", "review"],
            default: "todo"
        },

        //ownership
        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        //timing
        dueDate: Date,
        completedAt: Date

    }, {timestamps: true}
)

const Subtask = mongoose.model("Subtask", subtaskSchema)

export default Subtask