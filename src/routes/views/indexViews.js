import { Router } from "express"
import passport_call from "../../middlewares/passport_call.js"
import authorization from "../../middlewares/authorization.js"
import readToken from "../../middlewares/readToken.js"
import is_not_Logged from "../../middlewares/is_not_Logged.js"
import viewController from '../../controllers/viewController.js'

const {
    renderIndex, renderProductList,
    renderProductDetail, renderChat,
    renderCreateProduct, renderCart,
    renderRegister, renderLogin
} = viewController

const router = Router()

router.get('/', renderIndex)

router.get('/products', renderProductList)
router.get('/products/:pid', renderProductDetail)
router.get('/chat', passport_call('jwt'), renderChat)
router.get('/new_product', passport_call('jwt'), renderCreateProduct)
router.get('/cart', passport_call('jwt'), readToken, renderCart)
router.get('/register', is_not_Logged, renderRegister)
router.get('/login', is_not_Logged, renderLogin)


export default router