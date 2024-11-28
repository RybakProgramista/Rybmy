import { Router } from "express";
import {equip} from "../controllers/get/equip.js"
import {equipT} from "../controllers/getTable/equipT.js"
import {possibilityToBuy} from "../controllers/get/possibilityToBuy.js"
const router = Router()

router.get('/get/equip', equip)

router.get('/getTable/equip', equipT)

router.get('/get/possibilityToBuy', possibilityToBuy)

export default router
