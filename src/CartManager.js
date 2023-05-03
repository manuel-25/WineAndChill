import fs from 'fs'
import producto from './productManager.js'

class CartManager {
    constructor(path) {
      this.carts = []
      this.path = path
      this.init(path)
    }
  
    init(path) {
      try {
        const file = fs.existsSync(path)
        if (!file) {
          fs.writeFileSync(path, '[]')
          return 'File created at path: ' + this.path
        } else {
          this.carts = JSON.parse(fs.readFileSync(path, 'UTF-8'))
          return 'Data recovered'
        }
      } catch(err) {
        console.error('init:', err)
        return 'init: error'
      }
    }
  
    async writeFile(data_json) {
      await fs.promises.writeFile(this.path, data_json)
    }
  
    async addCart(productId, quantity) {
      try {
        const cartId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1
        let product = await producto.getProductById(productId)
        if(product.message) {
            return 'addCart: error: ' + product.message
        }
        const newCart = {
          id: cartId,
          products: [
            {
              productId,
              quantity
            }
          ]
        }
        this.carts.push(newCart)
        const data_json = JSON.stringify(this.carts, null, 2)
        await this.writeFile(data_json)
        return cartId
      } catch (error) {
        console.error(`addCart: error: ${error}`)
        return 'addCart: error'
      }
    }
  
    async getCarts() {
      try {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(data)
        if (this.carts.length === 0) {
          return 'Not found'
        }
        return this.carts
      } catch (error) {
        console.error(`getCarts: error: ${error}`)
        return 'getCarts: error'
      }
    }
  
    async getCartById(id) {
      try {
        const carts = await this.getCarts()
        const cart = carts.find(cart => cart.id == id) //con === no funciona
        if (!cart) {
          return {
            message: 'Product not found'
          }
        }
        return cart
      } catch (error) {
        console.error(`getCartById: error: ${error}`)
        return 'getCartById: error'
      }
    }
  }

  let carrito = new CartManager("./data/cart.json")

  async function manager() {
    await carrito.addCart(2, 2)
    await carrito.addCart(1, 5)
    await carrito.addCart(18, 2)
    await carrito.addCart(5, 10)
    console.log(await carrito.getCarts())
  }

  //manager()

  export default carrito