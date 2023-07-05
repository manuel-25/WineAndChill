import { Router } from "express"
import productList from './products/productList.js'
import productDetail from './products/productDetail.js'
import chatRouter from './chatRouter.js'
import newProduct from './products/newProduct.js'
import cart from './cartRouter.js'
import register from './user/register.js'
import login from './user/login.js'
import isAuthenticated from '../../middlewares/isAuthenticated.js'
import isAdmin from '../../middlewares/isAdmin.js'
import passport_call from "../../middlewares/passport_call.js"


const router = Router()


//home mover a su archivo propio
router.get('/', passport_call('jwt'), async (req, res, next) => {
    try {
        return res.render('index', {
            title: 'Home',
            style: 'index.css'
        })
    } catch (error) {
      next(error)
    }
})

router.use('/products', productList)
router.use('/products', productDetail)
router.use('/chat', isAuthenticated, chatRouter)
router.use('/new_product', isAdmin, newProduct)
router.use('/cart', isAuthenticated,cart)
router.use('/register', register)
router.use('/login', login)


export default router