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
        let newCart = {}
        const cartId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1000
        //Si los parametros vienen vacios creo un carrito vacio
        if(!productId && !quantity) {
          newCart = {
            id: cartId,
            products: []
          }
        }
        //Si tengo productId y Quantity agrego el producto al carrito
        if(productId && quantity) {
          const product = await producto.getProductById(productId)
          if (product.error) {
            return {
              error: product.error
            }
          }
          newCart = {
            id: cartId,
            products: [
              {
                productId,
                quantity
              }
            ]
          }
        }
        this.carts.push(newCart)
        const data_json = JSON.stringify(this.carts, null, 2)
        await this.writeFile(data_json)
    
        return newCart
      } catch (error) {
        console.error(`addCart: error: ${error}`)
        return {
          error: 'Error creating cart', error
        }
      }
    }
  
    async getCarts() {
      try {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(data)
        if (this.carts.length === 0) {
          return {
            error: 'Carts not found'
          }
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
            error: 'Product not found'
          }
        }
        return cart
      } catch (error) {
        console.error(`getCartById: error: ${error}`)
        return 'getCartById: error'
      }
    }

    async updateCart(cartId, newProducts) {
      try {
        const cartIndex = this.carts.findIndex(cart => cart.id == cartId)
        if (cartIndex === -1) {
          return {
            error: 'Cart not found'
          }
        }
        this.carts[cartIndex].products.splice(0, this.carts[cartIndex].products.length, ...newProducts)
        const data_json = JSON.stringify(this.carts, null, 2)
        await this.writeFile(data_json)
        return this.carts[cartIndex]
      } catch (error) {
        console.error(`updateCart: error: ${error}`)
        return {
          error: 'Error updating cart', error
        }
      }
    }

  }

  let carrito = new CartManager("./data/cart.json")

  export default carrito