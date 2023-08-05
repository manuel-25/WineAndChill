import { Router } from "express"
import productValidator from '../../middlewares/productValidator.js'
import authorization from "../../middlewares/authorization.js"
import productController from "../../controllers/productController.js"

const {
  getProducts, getProductById,
  createProduct, updateProduct,
  deleteProduct
} = productController

//revisar rutas
const router = Router()

//error al mandar status 200 con data.json vacio
router.get('/', getProducts)
router.get('/:pid([a-z0-9]+)', getProductById)
router.post('/', authorization('premium'), productValidator, createProduct)
router.put('/:pid([a-z0-9]+)', updateProduct)
router.delete('/:pid([a-z0-9]+)', deleteProduct)
      
export default router

