import { Router } from "express";
import { fishes } from "../controllers/get/fishes.js"
import { catchedFish } from "../controllers/get/catchedFish.js"
const router = Router()

router.get('/get/fishes', fishes)
router.get('/catchedFish', catchedFish)

export default router
