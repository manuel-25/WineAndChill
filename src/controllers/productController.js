import { productService } from "../Service/index.js"

class ProductController {
    async getProducts(req, res, next) {
      try {
        const limit = !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 6
        const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 1
        const title = req.query.title ? new RegExp(req.query.title, 'i') : null
        let query = {}
  
        if (title) query.title = title

        const all = await productService.paginate(query, { limit, page, lean: true })

        if (!all || all.error) {
            return res.status(404).send({
                status: 404,
                response: all.error || 'Products paginate error!'
              }) 
        }
        return res.status(200).send({
            status: 200,
            response: all
        })
      } catch (error) {
        next(error)
      }
    }
  
    async getProduct(req, res, next) {
      try {
        const productId = req.params.pid
        const product = await productService.getById(productId)
  
        if (!product) {
          return res.status(404).send({
            status: 404,
            response: 'Failed to get product ', productId
          })
        }
        return res.status(200).send({
          status: 200,
          response: product
        })
      } catch (error) {
        next(error)
      }
    }
  
    async createProduct(req, res, next) {
      try {
        const response = await productService.create(req.body)
        if (!response) {
            return res.status(404).json({
                status: 404,
                response: 'Failed to create product!'
              })
        }
        return res.status(201).json({
            status: 201,
            response: `Product ${response._id} created!`
          })
      } catch (error) {
        next(error)
      }
    }
  
    async updateProduct(req, res, next) {
      try {
        const { pid } = req.params
        const data = req.body
  
        if (!pid || !data) {
          return res.status(500).json({
            status: 500,
            response: 'Update Error: Please provide a valid product ID and data.',
          })
        }
  
        const product = await productService.updateProduct(pid, data, { new: true })
        if (!product) {
          return res.status(404).json({
            status: 404,
            response: 'Update Error: Product not updated!'
          })
        }
        return res.status(201).json({
          status: 201,
          response: `Product ${pid} updated!`
        })
  
      } catch (error) {
        next(error)
      }
    }
  
    async deleteProduct(req, res, next) {
      try {
        const pid = req.params.pid
        const product = await productService.delete(pid)
        if (!product) {
          return res.status(404).json({
            status: 404,
            response: 'Delete Error: Product not deleted!'
          })
        }
        return res.status(200).json({
          status: 200,
          response: `Product ${pid} deleted!`
        })
      } catch (error) {
        next(error)
      }
    }
  }
  
  export default new ProductController()
  