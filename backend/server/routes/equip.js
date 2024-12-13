import { Router } from "express";
import { equip } from "../controllers/get/equip.js"
import { equipT } from "../controllers/getTable/equipT.js"
import { possibilityToBuy } from "../controllers/get/possibilityToBuy.js"
import { buyEquip } from "../controllers/put/buyEquip.js"
const router = Router()

router.get('/equip', equip)

router.get('/getTable/equip', equipT)

router.get('/possibilityToBuy', possibilityToBuy)

router.put('/buyEquip', buyEquip)



export default router
