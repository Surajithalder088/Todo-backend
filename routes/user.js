import express from 'express'
import {signup,getusers,login,logout,profile} from "../controllers/user.js"
import{ auth} from "../controllers/auth.js"
const router=express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/users',getusers)
router.post('/logout',auth,logout)
router.post('/profile',auth,profile)
export default router;