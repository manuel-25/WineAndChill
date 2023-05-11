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
  
    async addCart(cartId, pid) {
      try {
        let newCart = {}
    
        if (!cartId && !pid) {
          // Si no se reciben cartId y pid, se crea un nuevo carrito vacío con un nuevo id.
          const newCartId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1000
          newCart = {
            id: newCartId,
            products: []
          }
        } else {
          // Si se reciben cartId y pid, se busca el carrito correspondiente y se agrega el producto.
          const cartToAdd = await this.getCartById(cartId)
          if (cartToAdd.error) {
            return {
              error: cartToAdd.error
            }
          }
          if (!cartToAdd) {
            return {
              error: 'Cart does not exist'
            }
          }
    
          const productToAdd = await producto.getProductById(pid)
          if (productToAdd.error) {
            return {
              error: productToAdd.error
            }
          }
          if (!productToAdd) {
            return {
              error: 'Product does not exist'
            }
          }
    
          const existingProduct = cartToAdd.products.find(p => p.pid === pid)
          console.log('existing product:',existingProduct)
          if (existingProduct) {
            existingProduct.quantity++
          } else {
            cartToAdd.products.push({
              productId: pid,
              quantity: 1
            })
          }
    
          newCart = cartToAdd
          console.log('new cart:',newCart)
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
            error: 'Cart not found'
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

    async delete(cartId, pid, units) {
      try {
        const cart = await this.getCartById(cartId)
        if (!cart) {
          return {
            error: "Cart not found",
          }
        }
        const productIndex = cart.products.findIndex((p) => p.id === pid)
        if (productIndex === -1) {
          return {
            error: "Product not found in cart",
          }
        }
        const product = cart.products[productIndex]
        if (units > product.quantity) {
          return {
            error: "Units to remove exceed the quantityin the cart",
          }
        }
        product.quantity -= units
        if (product.quantitys === 0) {
          cart.products.splice(productIndex, 1)
        }
        await this.updateCart(cartId, cart)
        return product
      } catch (error) {
        console.log("deleteFromCart: error", error)
        return {
          error: "deleteFromCart: error",
          error,
        }
      }
    }

  }

  

  let carrito = new CartManager('./src/data/cart.json')

  export default carrito