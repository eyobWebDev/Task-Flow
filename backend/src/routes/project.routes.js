import express from "express"
import { protectedRoute } from "../middlewares/auth.middleware.js"
import { createProject, deleteProject, editProject, getMyProjects } from "../controllers/project/project.controller.js"
import { addMilestone, removeMilestone, toggleMilestoneComplete } from "../controllers/project/milestone.controller.js"
import { acceptOrDeclineInvitations, getAllInvitations, inviteMember, removeMember } from "../controllers/team/team.controller.js"

const router = express.Router()

router.post("/create", protectedRoute, createProject)
router.get("/my-projects", protectedRoute, getMyProjects)
router.post("/delete", protectedRoute, deleteProject)
router.post("/edit", protectedRoute, editProject)
router.post("/milestone/add", protectedRoute, addMilestone)
router.post("/milestone/remove", protectedRoute, removeMilestone)
router.post("/milestone/toggle-complete", protectedRoute, toggleMilestoneComplete)
router.post("/invite", protectedRoute, inviteMember)
router.post("/accept-decline", protectedRoute, acceptOrDeclineInvitations)
router.get("/get-invitations", protectedRoute, getAllInvitations)
router.post("/remove-member", protectedRoute, removeMember)

export default router