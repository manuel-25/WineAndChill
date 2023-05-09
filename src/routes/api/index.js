import { Router } from "express"
import products_router from './productRoutes.js'
import cart_router from './cartRoutes.js'

const api_router = Router()

api_router.use('/products', products_router)
api_router.use('/carts', cart_router)

export default api_router