import { Router } from "express";
import { login } from "../controllers/get/login.js"
import { friends } from "../controllers/get/friends.js"
const router = Router()

router.get('/get/login', login)

router.get('/get/znajomi', friends)

export default router
