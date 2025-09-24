import express from "express"
import { protectedRoute } from "../middlewares/auth.middleware.js"
import { changePriority, changeStatus, createTask, deleteTask } from "../controllers/task/task.controller.js"

const router = express.Router()

router.post("/create", protectedRoute, createTask)
router.post("/delete", protectedRoute, deleteTask)
router.post("/change-status", protectedRoute, changeStatus)
router.post("/change-priority", protectedRoute, changePriority)


export default router