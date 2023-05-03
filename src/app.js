import express from 'express'
import producto from './productManager.js'
import carrito from './CartManager.js'


const server = express()
const PORT = 8080

let ready = () => console.log('Server Ready on Port: ' + PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({extended:true}))


let index_route = '/'
let index_function = (req, res) => {
    return res.send('Index')
}
server.get(index_route, index_function)

//Product Routes

let products_route = '/api/products'
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
server.get(products_route, products_Function)

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

