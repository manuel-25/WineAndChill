import { Router } from "express"
import products_router from './productRoutes.js'
import cart_router from './cartRoutes.js'
import cookies_router from './cookies.js'
import session_router from './sessions.js'

const router = Router()

router.use('/products', products_router)
router.use('/carts', cart_router)
router.use('/cookies', cookies_router)
router.use('/session', session_router) 


export default router