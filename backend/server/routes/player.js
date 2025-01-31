import { Router } from "express";
import { login } from "../controllers/get/login.js"
import { friends } from "../controllers/get/friends.js"
import { friendsChange } from "../controllers/put/friendsChange.js"
import { signup } from "../controllers/post/signup.js"
import { money } from "../controllers/get/money.js"
import { moneyChange } from "../controllers/put/moneyChange.js"
import testLogin from "../controllers/get/testLogin.js"
const router = Router()

router.get('/login', login)
router.get('/testLogin', testLogin)
router.post('/signup', signup)  //zmienić na post
router.get('/znajomi', friends)
router.put('/znajomi', friendsChange)
router.get('/money', money)
router.put('/money', moneyChange)

export default router
