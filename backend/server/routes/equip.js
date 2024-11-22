import { Router } from "express";
import {equip} from "../controllers/get/equip.js"
import {equipT} from "../controllers/getTable/equipT.js"
const router = Router()

router.get('/get/equip', equip)

router.get('/getTable/equip', equipT)

export default router
