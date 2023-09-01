import { Router } from "express"
import productValidator from '../../middlewares/productValidator.js'
import authorization from "../../middlewares/authorization.js"
import productController from "../../controllers/productController.js"
import readToken from "../../middlewares/readToken.js"

const {
  getProducts, getProduct,
  createProduct, updateProduct,
  deleteProduct
} = productController

//revisar rutas
const router = Router()

//error al mandar status 200 con data.json vacio
router.get('/', getProducts)
router.get('/:pid([a-z0-9]+)', getProduct)
router.post('/', authorization('PREMIUM'), productValidator, readToken, createProduct)
router.put('/:pid([a-z0-9]+)', readToken, updateProduct)
router.delete('/:pid([a-z0-9]+)', readToken, deleteProduct)
      
export default router

