import express from 'express'
import producto from './productManager.js'
import carrito from './CartManager.js'
import productRoutes from './routes/productRoutes.js'


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