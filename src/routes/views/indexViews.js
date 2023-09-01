import { Router } from "express"
import passport_call from "../../middlewares/passport_call.js"
import authorization from "../../middlewares/authorization.js"
import readToken from "../../middlewares/readToken.js"
import is_not_Logged from "../../middlewares/is_not_Logged.js"
import viewController from '../../controllers/viewController.js'
import is_valid_resetToken from "../../middlewares/is_valid_resetToken.js"

const {
    renderIndex, renderProductList,
    renderProductDetail, renderChat,
    renderCreateProduct, renderCart,
    renderRegister, renderLogin,
    renderForgotPassword, renderResetPassword,
    renderError, renderUpdateProduct
} = viewController

const router = Router()

router.get('/', renderIndex)

router.get('/products', renderProductList)
router.get('/products/:pid', renderProductDetail)
router.get('/chat', authorization('PUBLIC'), readToken, renderChat)
router.get('/new_product', authorization('PREMIUM'), renderCreateProduct)
router.get('/update_product/:productId', authorization('PREMIUM'), renderUpdateProduct)
router.get('/cart', readToken, renderCart)
router.get('/register', is_not_Logged, renderRegister)
router.get('/login', is_not_Logged, renderLogin)
router.get('/forgot-password', renderForgotPassword)
router.get('/reset-password/:token', is_valid_resetToken, renderResetPassword)
router.get('/error', renderError)


export default router