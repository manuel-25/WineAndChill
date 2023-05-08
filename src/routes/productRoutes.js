import { Router } from "express"
import producto from '../productManager.js'

const router = Router()

router.get('/', async (req, res) => {
        try {
            const limit = req.query.limit
            let products = await producto.getProducts()
            if (products) {
            let productsToSend = limit ? products.slice(0, limit) : products
            return res.send({
                resolve: true,
                products: productsToSend
            })
            } else {
            return res.send({
                resolve: false,
                message: products.message ?? 'unexpected error'
            })
            }
        } catch (error) {
            console.log(error)
        }
    })

    router.get('/:pid', async (req, res) => {
        try{
            let pid = req.params.pid
            let result = await producto.getProductById(pid)
            if (result.message) {
              return res.send({
                  resolve: false,
                  message: result.message ?? 'unexpected error'
                })
            }
            return res.send({
              resolve: true,
              product: result.product
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                resolve: false,
                message: 'Error finding product.', err
              })
        }
    })

    router.post('/', async (req, res) => {
        try {
            const Newproduct = await producto.add_Product(req.body)
    
            // Verificamos si el objeto Newproduct tiene la propiedad error
            if (Newproduct && Newproduct.error) {
                return res.status(400).json({
                    resolve: false,
                    message: Newproduct.error
                })
            }
    
            return res.status(201).json({
                resolve: true,
                message: `Product ${Newproduct.id} created!`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                resolve: false,
                message: 'Error creating product.', err
            })
        }
    })

    router.put('/:pid', async (req, res) => {
        try {
          const { pid } = req.params
          const data = req.body
      
          if (!pid || !data) {
            return res.status(500).json({
              resolve: false,
              message: 'Error updating! Please provide a valid product ID and data.',
            })
          }
      
          const result = await producto.updateProduct(Number(pid), data)
      
          if (result && result.message) {
            return res.status(500).json({
              resolve: false,
              message: result.message
            })
          }
      
          return res.status(201).json({
            resolve: true,
            message: `Product ${pid} updated!`
          })
        } catch (err) {
          console.log(err)
          return res.status(500).json({
            resolve: false,
            message: 'Error updating product.', err
          })
        }
      })

      router.delete('/:pid', async (req, res) => {
        try {
          let pid = Number(req.params.pid)
          let result = await producto.deleteProduct(pid)
          if(pid && !result.message) {
            return res.status(201).json({
              resolve: 'success',
              message: `Product ${pid} deleted!`
            })
          } else {
            return res.status(400).json({
              resolve: false,
              message: result.message
            })
          }
        } catch (err) {
          console.log(err)
          return res.status(500).json({
            resolve: false,
            message: 'Error deleting product.', err
          })
        }
      })
      
export default router

