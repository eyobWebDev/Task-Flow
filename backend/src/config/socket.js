import { Server } from "socket.io"
import http from "http"
import express from "express"
import { group } from "console"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://mern-chat-app-rho-blue.vercel.app/login"],
    },
})

const userSocketMap = {}
export function getSocketId(userId) {
    return  userSocketMap[userId]
}

io.on("connection", socket => {
    console.log("User connected ", socket.id)
    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("join-group", groupId => {
        socket.join(groupId)
    })

    socket.on("leave-group", groupId => {
        socket.leave(groupId)
    })
    
    socket.on("disconnect", () => {
        console.log("User disconnected ", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {app, server, io }