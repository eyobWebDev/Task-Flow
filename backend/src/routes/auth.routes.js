import express from "express"
import {signup, login, logout, checkAuth, updateProfilePic, updateProfile, searchUser } from "../controllers/auth.controller.js"
import {googleAuth, setUserAndRedirect} from "../controllers/googleAuth.controller.js"
import {protectedRoute} from "../middleware/auth.middleware.js"
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
router.get("/google/login", googleAuth)
router.get("/google/login/redirect", setUserAndRedirect)
router.get("/search", protectedRoute, searchUser)


export default router