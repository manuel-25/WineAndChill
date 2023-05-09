import { Router } from "express"
import producto from '../../managers/productManager.js'

const router = Router()

router.get('/', async (req, res) => {
        try {
          //error al mandar status 200 con data.json vacio
            const limit = req.query.limit
            let products = await producto.getProducts()
            if (products) {
              let productsToSend = limit ? products.slice(0, limit) : products
              return res.send({
                  status: 200,
                  response: productsToSend
              })
            } else {
            return res.status(404).send({
                status: 404,
                response: products.error || 'unexpected error'
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
            if (result.error) {
              return res.status(404).send({
                  status: 404,
                  response: result.error || 'unexpected error'
                })
            }
            return res.status(200).send({
              status: 200,
              response: result.product
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: 500,
                response: 'Error finding product.', err
              })
        }
    })

    //error al crear producto con el body vacio lo crea igual
    router.post('/', async (req, res) => {
        try {
            const Newproduct = await producto.add_Product(req.body)
    
            // Verificamos si el objeto Newproduct tiene la propiedad error
            if (Newproduct && Newproduct.error) {
                return res.status(404).json({
                    status: 404,
                    response: Newproduct.error
                })
            }
    
            return res.status(201).json({
                status: 201,
                response: `Product ${Newproduct.id} created!`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: 500,
                response: 'Error creating product.', err
            })
        }
    })

    router.put('/:pid', async (req, res) => {
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
      
          if (result && result.error) {
            return res.status(404).json({
              status: 404,
              response: result.error
            })
          }
      
          return res.status(201).json({
            status: 201,
            response: `Product ${pid} updated!`
          })
        } catch (err) {
          console.log(err)
          return res.status(500).json({
            status: 500,
            response: 'Error updating product.', err
          })
        }
      })

      router.delete('/:pid', async (req, res) => {
        try {
          let pid = Number(req.params.pid)
          let result = await producto.deleteProduct(pid)
          if(pid && !result.error) {
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
        } catch (err) {
          console.log(err)
          return res.status(500).json({
            status: 500,
            response: 'Error deleting product.', err
          })
        }
      })
      
export default router

