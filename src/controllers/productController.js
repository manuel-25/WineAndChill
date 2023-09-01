import { productService, userService } from "../Service/index.js"

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
            response: `Failed to get product ${productId}`
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
        const token = req.token ?? null
        req.body.owner = token.email

        const response = await productService.createProduct(req.body)
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
        const userEmail = req.token.email
  
        if (!pid || !data) {
          return res.status(500).json({
            status: 500,
            response: 'Update Error: Please provide a valid product ID or data.',
          })
        }

        const userData = await userService.getByEmail(userEmail)
        const productData = await productService.getById(pid)

        if(productData.owner === userData.email || userData.role === 'OWNER') {
          const product = await productService.updateProduct(pid, data, { new: true })
          if (!product) {
            return res.status(404).json({
              status: 404,
              response: `Update Error: Product ${pid} not updated!`
            })
          }

          return res.status(201).json({
            status: 201,
            response: `Product ${pid} updated!`,
            productId: pid
          })
        } else {
          return res.status(401).json({
            status: 401,
            response: `Update Error: Not authorized! Owner: ${productData.owner}`
          })
        }
      } catch (error) {
        next(error)
      }
    }
  
    async deleteProduct(req, res, next) {
      try {
        const pid = req.params.pid
        const userEmail = req.token.email
        console.log(userEmail)

        const userData = await userService.getByEmail(userEmail)
        const productData = await productService.getById(pid)

        if(productData.owner === userData.email || userData.role === 'OWNER') {
          const product = await productService.deleteProduct(pid)
          if (!product) {
            return res.status(404).json({
              status: 404,
              response: `Delete Error: Product ${pid} not deleted!`
            })
          }
          return res.status(200).json({
            status: 200,
            response: `Product ${pid} deleted!`
          })
        } else {
          return res.status(401).json({
            status: 401,
            response: `Delete Error: Not authorized! Owner: ${productData.owner}`
          })
        }
      } catch (error) {
        next(error)
      }
    }
  }
  
export default new ProductController()
  