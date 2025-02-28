import { Router } from "express";
import { login } from "../controllers/get/login.js"
import { friends } from "../controllers/get/friends.js"
import { friendsChange } from "../controllers/put/friendsChange.js"
import { signup } from "../controllers/post/signup.js"
import { money } from "../controllers/get/money.js"
import authenticate from "../controllers/get/authenticate.js";
import { moneyChange } from "../controllers/put/moneyChange.js"
import testLogin from "../controllers/get/testLogin.js"
import authenticate from "../controllers/get/authenticate.js";
const router = Router()

router.get('/login', authenticate, login)
router.get('/authenticate', authenticate)
router.post('/signup', signup)  //zmienić na post
router.get('/znajomi', authenticate, friends)
router.put('/znajomi', friendsChange)
router.get('/money', authenticate, money)
router.put('/money', authenticate, moneyChange)

export default router
