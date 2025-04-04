import { Router } from "express";
import { fishes } from "../controllers/get/fishes.js"
import { catchedFish } from "../controllers/get/catchedFish.js"
import { moneyChange } from "../controllers/put/moneyChange.js"
import authenticate from "../controllers/get/authenticate.js";
const router = Router()

router.get('/get/fishes', fishes)
router.get('/catchedFish', authenticate, catchedFish, moneyChange)

export default router
