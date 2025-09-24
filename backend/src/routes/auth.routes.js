import express from "express"
import {signup, login, logout, checkAuth, updateProfilePic, updateProfile, searchUser, updateLastActive } from "../controllers/auth/auth.controller.js"
import {protectedRoute} from "../middlewares/auth.middleware.js"
import multer from 'multer'
const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage });

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/check-auth", protectedRoute, checkAuth)
router.post("/update-profile-pic", protectedRoute, updateProfilePic)
router.post("/update-profile", protectedRoute, updateProfile)
router.get("/search", protectedRoute, searchUser)
router.put("/update-last-active", protectedRoute, updateLastActive)


export default router