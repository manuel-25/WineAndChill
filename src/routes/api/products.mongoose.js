import { Router } from "express"
import producto from '../../managers/ProductManager.js'
import Product from '../../models/product.model.js'
import productValidator from '../../middlewares/productValidator.js'


const router = Router()

//error al mandar status 200 con data.json vacio
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    let productDB = await Product.find()
    if (productDB) {
      const startIndex = (page - 1) * limit // Calculo el indice de inicio
      const endIndex = startIndex + limit // Calculo el indice de fin

      let productsToSend = productDB.slice(startIndex, endIndex)

      return res.send({
        status: 200,
        response: {
          products: productsToSend,
          totalProducts: productDB.length,
          totalPages: Math.ceil(productDB.length / limit),
          currentPage: page
        }
      })
    } else {
      return res.status(404).send({
        status: 404,
        response: productDB.error || 'unexpected error'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:pid', async (req, res, next) => {
  try{
    let pid = req.params.pid
    let result = await producto.getProductById(pid)
    if (result.error) {
      return res.status(404).send({
          status: 404,
          response: result.error || 'unexpected error'
        })
    }
    return res.status(200).send({
      status: 200,
      response: result
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', productValidator, async (req, res, next) => {
  try {
    const response = await Product.create(req.body)
    //console.log(response)

    if (response) {
      return res.status(201).json({
        status: 201,
        response: `Product ${response._id} created!`
      })
    } else {
      return res.status(404).json({
        status: 404,
        response: 'Failed to create product!'
      })
    }
  } catch (error) {
    next(error)
  }
})


router.put('/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params
    const data = req.body

    if (!pid || !data) {
      return res.status(500).json({
        status: 500,
        response: 'Error updating! Please provide a valid product ID and data.',
      })
    }

    const result = await producto.updateProduct(Number(pid), data)

    if (result.error) {
      return res.status(404).json({
        status: 404,
        response: result.error
      })
    }

    return res.status(201).json({
      status: 201,
      response: `Product ${pid} updated!`
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:pid', async (req, res, next) => {
  try {
    let pid = Number(req.params.pid)
    let result = await producto.deleteProduct(pid)
    if (pid && !result.error) {
      return res.status(200).json({
        status: 200,
        response: `Product ${pid} deleted!`
      })
    } else {
      return res.status(404).json({
        status: 404,
        response: result.error
      })
    }
  } catch (error) {
    next(error)
  }
})
      
export default router

