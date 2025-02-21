import { Router } from "express";
import { equip } from "../controllers/get/equip.js"
import { equipT } from "../controllers/getTable/equipT.js"
import { possibilityToBuy } from "../controllers/get/possibilityToBuy.js"
import { buyEquip } from "../controllers/put/buyEquip.js"
import authenticate from "../controllers/get/authenticate.js";
const router = Router()

router.get('/equip', authenticate, equip)

router.get('/getTable/equip', equipT)

router.get('/possibilityToBuy', authenticate, possibilityToBuy)

router.put('/buyEquip', authenticate, buyEquip)



export default router
