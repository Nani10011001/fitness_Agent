import express from "express"
import { Login, logout, Signup } from "../contoller/auth.user.js"
import { auth_profile } from "../contoller/auth.profile.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

import { agentcontroller } from "../contoller/memorycheckAgent.js"
const router=express.Router()
router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",logout)
router.post("/profile",authMiddleware,auth_profile)
router.post('/agent/mem',agentcontroller)

export default router