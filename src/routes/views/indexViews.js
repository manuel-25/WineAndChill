import { Router } from "express"
import productListViewController from "../../controllers/views/productListViewController.js"
import productDetailViewController from "../../controllers/views/productDetailViewController.js"
import chatViewController from "../../controllers/views/chatViewController.js"
import createProductViewController from "../../controllers/views/createProductViewController.js"
import cartViewController from "../../controllers/views/cartViewController.js"
import registerViewController from "../../controllers/views/registerViewController.js"
import loginViewController from "../../controllers/views/loginViewController.js"
import isAuthenticated from '../../middlewares/isAuthenticated.js'
import passport_call from "../../middlewares/passport_call.js"
import indexViewController from "../../controllers/views/indexViewController.js"
import authorization from "../../middlewares/authorization.js"
import readToken from "../../middlewares/readToken.js"

const router = Router()

router.get('/', indexViewController)

router.get('/products', productListViewController)
router.get('/products/:pid', productDetailViewController)
router.get('/chat', passport_call('jwt'), chatViewController)
router.get('/new_product', passport_call('jwt'), authorization('PREMIUM'), createProductViewController)
router.get('/cart', passport_call('jwt'), readToken,cartViewController)
router.get('/register', registerViewController)
router.get('/login', loginViewController)


export default router