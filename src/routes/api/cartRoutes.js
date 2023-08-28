import { Router } from "express"
import readToken from "../../middlewares/readToken.js"
import cartController from "../../controllers/cartController.js"
import passport_call from '../../middlewares/passport_call.js'
import authorization from "../../middlewares/authorization.js"

const router = Router()
const {
  getCarts, getCartById,
  getCartBills, addToCart,
  updateCartProduct, deleteCartProduct,
  deleteCart, purchase
} = cartController

router.get('/', getCarts)
router.get('/cartId/:cartId([a-z0-9]+)', getCartById)
router.get('/bills', readToken, getCartBills)

router.post('/cart/product/:productId([a-z0-9]+)/:quantity([a-z0-9]+)',passport_call('jwt') , readToken, addToCart)
router.post('/purchase', readToken, purchase)

router.put('/:cartId([a-z0-9]+)/product/:productId([a-z0-9]+)/:units([0-9]+)',passport_call('jwt'), updateCartProduct)
router.delete('/:cartId([a-z0-9]+)/product/:productId([a-z0-9]+)/',passport_call('jwt'), deleteCartProduct)
router.delete('/:cartId([a-z0-9]+)',passport_call('jwt'), deleteCart)
  
export default router