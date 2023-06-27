import { Router } from "express"
import productList from './products/productList.js'
import productDetail from './products/productDetail.js'
import chatRouter from './chatRouter.js'
import newProduct from './products/newProduct.js'
import cart from './cartRouter.js'
import register from './user/register.js'
import login from './user/login.js'
import isLogged from '../../middlewares/isLogged.js'
import isAdmin from '../../middlewares/isAdmin.js'

const router = Router()


//home mover a su archivo propio
router.get('/', async (req, res, next) => {
    try {
        return res.render('index', {
            title: 'Home',
            style: 'index.css',
        })
    } catch (error) {
      next(error)
    }
})

router.use('/products', productList)
router.use('/products', productDetail)
router.use('/chat', isLogged, chatRouter)
router.use('/new_product', isAdmin, newProduct)
router.use('/cart', isLogged,cart)
router.use('/auth/register', register)
router.use('/auth/login', login)


export default router