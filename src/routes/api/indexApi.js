import { Router } from "express"
import products_router from './products.mongoose.js'
import cart_router from './carts.mongoose.js'

const router = Router()

router.use('/products', products_router)
router.use('/carts', cart_router)

export default router