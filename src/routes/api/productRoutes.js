import { Router } from "express"
import producto from '../../managers/ProductManager.js'

const router = Router()

//error al mandar status 200 con data.json vacio
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    let products = await producto.getProducts()
    if (products) {
      const startIndex = (page - 1) * limit // Calculo el indice de inicio
      const endIndex = startIndex + limit // Calculo el indice de fin

      let productsToSend = products.slice(startIndex, endIndex)

      return res.send({
        status: 200,
        response: {
          products: productsToSend,
          totalProducts: products.length,
          totalPages: Math.ceil(products.length / limit),
          currentPage: page
        }
      })
    } else {
      return res.status(404).send({
        status: 404,
        response: products.error || 'unexpected error'
      });
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

    //error al crear producto con el body vacio lo crea igual
router.post('/', async (req, res, next) => {
  try {
    const { title, description, price, code, stock, status, category, thumbnail } = req.body
    const Newproduct = await producto.add_Product({ title, description, price, code, stock, status, category, thumbnail})

    if (Newproduct.error) {
      return res.status(404).json({
        status: 404,
        response: Newproduct.error
      })
    }

    return res.status(201).json({
      status: 201,
      response: `Product ${Newproduct.id} created!`
    })
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

