import { Router } from "express"
import Product from '../../models/product.model.js'
import productValidator from '../../middlewares/productValidator.js'
import isAdmin from '../../middlewares/isAdmin.js'
import passport_call from "../../middlewares/passport_call.js"


const router = Router()

//error al mandar status 200 con data.json vacio
router.get('/', async (req, res, next) => {
  try {
    const limit = !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 6
    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 1
    const title = req.query.title ? new RegExp(req.query.title, 'i') : null

    let query = {}
    if (title) {
      query.title = title
    }

    let all = await Product.paginate(query, { limit, page, lean: true })

    if (all) {
      return res.status(200).send({
        status: 200,
        response: all
      })
    }
    return res.status(404).send({
      status: 404,
      response: all.error || 'Products paginate error!'
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:pid', async (req, res, next) => {
  try{
    const pid = req.params.pid
    const product = await Product.findById(pid)

    if (!product) {
      return res.status(404).send({
        status: 404,
        response: 'Failed to get product id: ', pid
      })
    }
    return res.status(200).send({
      status: 200,
      response: product
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, productValidator, async (req, res, next) => {
  try {
    const response = await Product.create(req.body)
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

    const product = await Product.findByIdAndUpdate(pid, data, {new: true})
    if (!product) {
      return res.status(404).json({
        status: 404,
        response: 'Error: Product not updated!'
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
    const pid = req.params.pid
    console.log(pid)
    const product = await Product.findByIdAndDelete(pid)
    if (!product) {
      return res.status(404).json({
        status: 404,
        response: 'Error: Product not deleted!'
      })
    }
    return res.status(200).json({
      status: 200,
      response: `Product ${pid} deleted!`
    })
  } catch (error) {
    next(error)
  }
})
      
export default router

