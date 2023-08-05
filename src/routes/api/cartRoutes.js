import { Router } from "express"
import readToken from "../../middlewares/readToken.js"
import cartController from "../../controllers/cartController.js"
const router = Router()
const {
  getCarts,
  getCartById,
  getCartBills,
  addToCart,
  updateCartProduct,
  deleteCartProduct,
  deleteCart
} = cartController

//Falta ordenar por title
router.get('/', getCarts)
router.get('/cartId/:cartId([a-z0-9]+)', getCartById)
router.get('/bills', readToken, getCartBills)

//falta asociar el carrito creado al usuario usando token
router.post('/:cartId?/product/:productId([a-z0-9]+)/:quantity([a-z0-9]+)', readToken, addToCart)
router.put('/:cartId([a-z0-9]+)/product/:productId([a-z0-9]+)/:units([0-9]+)', updateCartProduct)
router.delete('/:cartId([a-z0-9]+)/product/:productId([a-z0-9]+)/', deleteCartProduct)
router.delete('/:cartId([a-z0-9]+)', deleteCart)
  
export default router