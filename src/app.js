import express from 'express'
import producto from './productManager.js'
import carrito from './CartManager.js'
import { productRoutes } from './routes/productRoutes.js'


const server = express()
const PORT = 8080

let ready = () => console.log('Server Ready on Port: ' + PORT)

server.listen(PORT, ready)

server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/static', express.static('public'))


server.use('/api/products', productRoutes)


let index_route = '/'
let index_function = (req, res) => {
    return res.send('Index')
}
server.get(index_route, index_function)

//Product Routes
/*let products_route = '/api/products'
let products_Function = async (req, res) => {
    const limit = req.query.limit
    let products = await producto.getProducts()
    if (products) {
      let productsToSend = limit ? products.slice(0, limit) : products
      return res.send({
        success: true,
        products: productsToSend
      })
    } else {
      return res.send({
        success: false,
        message: 'No products found'
      })
    }
  }
server.get(products_route, products_Function)*/

  let products_route_pid = '/api/products/:pid'
  let products_pid_Function = async (req, res) => {
      let pid = req.params.pid
      let result = await producto.getProductById(pid)
      if (result.message) {
        return res.send({
            success: false,
            message: result.message
          })
      }
      return res.send({
        success: true,
        product: result.product
      })
  }
  
  server.get(products_route_pid, products_pid_Function)

  //Cart Routes
  let carts_route = '/api/carts'
  let carts_Function = async (req, res) => {
      let carts = await carrito.getCarts()
      if (carts) {
        return res.send({
          success: true,
          response: carts
        })
      } else {
        return res.send({
          success: false,
          message: 'No carts found'
        })
      }
    }
  server.get(carts_route, carts_Function)

  let carts_route_pid = '/api/carts/:pid'
  let carts_pid_Function = async (req, res) => {
      let pid = req.params.pid
      let result = await carrito.getCartById(pid)
      console.log(pid)
      if (result.message) {
        return res.send({
            success: false,
            message: result.message
          })
      }
      return res.send({
        success: true,
        response: result
      })
  }
  
  server.get(carts_route_pid, carts_pid_Function)

// Product Post
server.post(
  '/api/products',
  async (req,res) => {
    try {
      let title = req.body.title ?? null
      let description = req.body.description ?? null
      let price = req.body.price ?? null
      let thumbnail = req.body.thumbnail ?? null
      let stock = req.body.stock ?? null 
      let code = req.body.code ?? null
      if (title&&description&&price&&thumbnail&&stock&&code) {
        let Newproduct = await producto.add_Product({ title,description,price,thumbnail,code,stock })
        console.log(Newproduct)
        return res.status(201).json({
          resolve: true,
          message: `Product ${Newproduct.id} created!`
        })
      } else {
        return res.status(400).json({
          resolve: false,
          message: 'Complete data!'
        })
      }
    } catch(err) {
      console.log(err)
    }
  }
)

// Product Put

server.put(
  '/api/products/:pid',
  (req,res) => {
    try {
      if(req.body&&req.params.pid){
        let pid = Number(req.params.pid)
        let data = req.body
        producto.updateProduct(pid, data)
        return res.status(201).json({
          resolve: true,
          message: `Product ${pid} updated!`
        })
      } else {
        return res.status(400).json({
          resolve: false,
          message: 'Error updating!'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
)

server.delete(
  '/api/products/:pid',
  async (req,res) => {
    try {
      let pid = Number(req.params.pid)
      let result = await producto.deleteProduct(pid)
      if(pid&&!result.message){
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
    }
  }
)