import { Router } from "express"
import products_router from './productRoutes.js'
import cart_router from './cartRoutes.js'
import auth_router from './authRoutes.js'
import testing_router from './testingRoutes.js'
import passport_call from "../../middlewares/passport_call.js"
import authorization from "../../middlewares/authorization.js"

const router = Router()

router.use('/products', products_router)
router.use('/carts', cart_router)
router.use('/auth', auth_router)
router.use('/test', passport_call('jwt'), authorization('OWNER'), testing_router)


export default router