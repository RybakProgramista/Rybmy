import { Router } from "express";
import {fishes} from "../controllers/get/fishes.js"
const router = Router()

router.get('/get/fishes', fishes)

export default router
