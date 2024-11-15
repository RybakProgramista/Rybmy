import { Router } from "express";
import {zylka} from "../controllers/get/zylka.js"
import {wedka} from "../controllers/get/wedka.js"
import {kolowrotek} from "../controllers/get/kolowrotek.js"
import {zylkaT} from "../controllers/getTable/zylka.js"
import {wedkaT} from "../controllers/getTable/wedka.js"
import {kolowrotekT} from "../controllers/getTable/kolowrotek.js"
const router = Router()

router.get('/get/zylka', zylka)
router.get('/get/wedka', wedka)
router.get('/get/kolowrotek', kolowrotek)

router.get('/getTable/zylka', zylkaT)
router.get('/getTable/wedka', wedkaT)
router.get('/getTable/kolowrotek', kolowrotekT)

export default router
