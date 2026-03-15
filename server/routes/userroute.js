
import {Router} from 'express'
import {SignUp} from '../controller/userAuthentication/signup.js'
import {Login} from '../controller/userAuthentication/login.js'
import { getme } from '../controller/userAuthentication/getme.js'
import { userAuthMiddleware } from '../Middleware/userAuthentication.js'
import { Logout } from '../controller/userAuthentication/logout.js'

export const userAuthroute=Router()

userAuthroute.post('/signup',SignUp)
userAuthroute.post('/login',Login)
userAuthroute.post('/logout',userAuthMiddleware,Logout)
userAuthroute.get('/getme',userAuthMiddleware,getme)

