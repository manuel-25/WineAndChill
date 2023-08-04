import { Router } from "express"
import readToken from "../../middlewares/readToken.js"

import cartController from "../../controllers/cartController.js"

const router = Router()

//Falta ordenar por title
router.get('/', cartController.getCarts)
router.get('/cartId/:cartId([a-z0-9]+)', cartController.getCartById)
router.get('/bills', readToken, cartController.getCartBills)

//falta asociar el carrito creado al usuario usando token
router.post('/:cartId?/product/:productId([a-z0-9]+)/:quantity([a-z0-9]+)', readToken, cartController.addToCart)
router.put('/:cartId([a-z0-9]+)/product/:productId([a-z0-9]+)/:units([0-9]+)', cartController.updateCartProduct)
router.delete('/:cartId([a-z0-9]+)/product/:productId([a-z0-9]+)/', cartController.deleteCartProduct)
router.delete('/:cartId([a-z0-9]+)', cartController.deleteCart)
  
export default router