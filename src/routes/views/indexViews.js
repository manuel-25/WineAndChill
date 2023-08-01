import { Router } from "express"
import passport_call from "../../middlewares/passport_call.js"
import authorization from "../../middlewares/authorization.js"
import readToken from "../../middlewares/readToken.js"
import is_not_Logged from "../../middlewares/is_not_Logged.js"
import viewController from '../../controllers/viewController.js'

const router = Router()

router.get('/', viewController.index)

router.get('/products', viewController.productList)
router.get('/products/:pid', viewController.productDetail)
router.get('/chat', passport_call('jwt'), viewController.chat)
router.get('/new_product', passport_call('jwt'), viewController.createProduct)
router.get('/cart', passport_call('jwt'), readToken,viewController.cart)
router.get('/register', is_not_Logged, viewController.register)
router.get('/login', is_not_Logged, viewController.login)


export default router