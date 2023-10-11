import { Router } from "express"
import productValidator from '../../middlewares/productValidator.js'
import authorization from "../../middlewares/authorization.js"
import productController from "../../controllers/productController.js"
import readToken from "../../middlewares/readToken.js"
import uploaderProduct from "../../utils/uploaderProduct.js"
import multerErrorHandler from "../../middlewares/multerErrorHandler.js"

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
router.post('/', authorization('PREMIUM'), readToken, uploaderProduct.single("thumbnail"), multerErrorHandler, productValidator, createProduct)
router.put('/:pid([a-z0-9]+)', authorization('PREMIUM'), readToken, updateProduct)
router.delete('/:pid([a-z0-9]+)', authorization('PREMIUM'), readToken, deleteProduct)
      
export default router

