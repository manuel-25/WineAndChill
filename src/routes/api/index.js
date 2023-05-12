import { Router } from "express"
import products_router from './productRoutes.js'
import cart_router from './cartRoutes.js'

const router = Router()

router.use('/products', products_router)
router.use('/carts', cart_router)

export default router