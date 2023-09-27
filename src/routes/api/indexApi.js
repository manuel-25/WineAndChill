import { Router } from "express"
import products_router from './productRoutes.js'
import cart_router from './cartRoutes.js'
import auth_router from './authRoutes.js'
import user_router from './userRoutes.js'
import testing_router from './testingRoutes.js'
import authorization from "../../middlewares/authorization.js"

const router = Router()

router.use('/products', products_router)
router.use('/carts', cart_router)
router.use('/auth', auth_router)
router.use('/users', /*authorization('OWNER'),*/ user_router)
router.use('/test', authorization('OWNER'), testing_router)


export default router