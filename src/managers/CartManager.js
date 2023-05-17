import fs from 'fs'
import producto from './ProductManager.js'

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
    
          //Busco el producto y devuelvo en caso de error
          const productToAdd = await producto.getProductById(pid)
          console.log(productToAdd)
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
          if (productToAdd.stock === 0) {
            return {
              error: 'No stock available'
            }
          }

          //Agregar reducir el stock cuando agrego un producto
          const existingProduct = cartToAdd.products.find(p => p.productId === pid)
          if (existingProduct) {
            existingProduct.quantity++
          } else {
            cartToAdd.products.push({
              productId: pid,
              quantity: 1
            })
          }
    
          newCart = cartToAdd
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

    //Recibe un Id y un array de productos
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
        console.error(`updateCart error: ${error}`)
        return {
          error: 'Error updating cart', error
        }
      }
    }

    async delete(cartId, productId) {
      try {
        let cart = await this.getCartById(cartId);
        if (!cart) {
          return {
            error: 'Cart not found',
          }
        }
    
        const productIndex = cart.products.findIndex((p) => p.productId == productId)
        if (productIndex === -1) {
          return {
            error: 'Product not found in cart',
          }
        }
    
        // Actualizo el stock del carrito y producto
        let productFromCart = cart.products[productIndex]
        let productFromDB = await producto.getProductById(productFromCart.productId)
        if (productFromDB.error) {
          return {
            error: 'Product not found in database: ' + productFromDB.error,
          }
        }
    
        const newStock = productFromDB.stock + productFromCart.quantity
        let productToUpdate = await producto.updateProduct(productFromCart.productId, { stock: newStock })
        if (productToUpdate.error) {
          return {
            error: 'Failed to update stock: ' + productToUpdate.error,
          }
        }
    
        cart.products.splice(productIndex, 1)
    
        // Crear un array de productos para pasar a updateCart
        const newCartProducts = cart.products.map((product) => ({ ...product }))
        let updatedCart = await this.updateCart(cartId, newCartProducts)
    
        return updatedCart;
      } catch (error) {
        console.log('deleteFromCart: ', error)
        return {
          error: 'deleteFromCart: ',error,
        }
      }
    }
    

  }

  

  let carrito = new CartManager('./src/data/cart.json')

  export default carrito