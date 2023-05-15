import { Router } from "express"
import productList from './products/productList.js'
import productDetail from './products/productDetail.js'

const router = Router()


//home mover
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


export default router