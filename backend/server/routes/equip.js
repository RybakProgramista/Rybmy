import { Router } from "express";
import {equip} from "../controllers/get/equip.js"
import {equipT} from "../controllers/getTable/equipT.js"
import {possibilityToBuy} from "../controllers/get/possibilityToBuy.js"
import {buyEquip} from "../controllers/post/buyEquip.js"
const router = Router()

router.get('/get/equip', equip)

router.get('/getTable/equip', equipT)

router.get('/get/possibilityToBuy', possibilityToBuy)

router.get('/post/buyEquip', buyEquip)



export default router
