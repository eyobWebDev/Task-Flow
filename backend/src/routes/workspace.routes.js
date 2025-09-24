import express from "express"
import { createWorkspace, getMyWorkspace } from "../controllers/workspace/workspace.controller.js"
import {protectedRoute} from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/create", protectedRoute, createWorkspace)
router.get("/my-workspace", protectedRoute, getMyWorkspace)

export default router