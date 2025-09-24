import {config } from "dotenv"
import express from "express"
import {connectDB } from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import {app, server } from "./config/socket.js"
import path from "path"
import authRouter from "./routes/auth.routes.js"
import workspaceRouter from "./routes/workspace.routes.js"
import projectRouter from "./routes/project.routes.js"
import taskRouter from "./routes/task.routes.js"

config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true }))

const __dirname = path.resolve()
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.use("/api/auth", authRouter)
app.use("/api/workspace", workspaceRouter)
app.use("/api/project", projectRouter)
app.use("/api/task", taskRouter)



server.listen(process.env.PORT, () => {
    console.log("server listening on port "+process.env.PORT)
    connectDB()
})
