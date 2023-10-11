import { userService, productService, cartService, ticketService } from "../Service/index.js"
import { generateAlphanumericCode } from "../utils.js"
import mongoose from "mongoose"
import { sendTicketEmail } from "../utils/sendEmail.js"

class CartController {
  async getCarts(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) ?? 6
      const carts = await cartService.getAll()
  
      //agregar paginate
      if (carts) {
        let cartsToSend = limit ? carts.slice(0, limit) : carts
        return res.status(200).send({
          status: 200,
          response: cartsToSend
        })
      } else {
        return res.status(404).send({
          status: 404,
          response: 'Get Error: Failed to get cart list'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async getCartById(req, res, next) {
    try {
      const cartId = req.params.cartId
      const result = await cartService.getById(cartId)
      if (!result) {
        return res.status(404).send({
          status: 404,
          response: 'Get Error: Failed to get Cart Id: ', cartId
        })
      }
      return res.status(200).send({
        status: 200,
        response: result
      })
    } catch (error) {
      next(error)
    }
  }

  async getCartBills(req, res, next) {
    try {
      const cartId = req.token?.cartId ?? null
      const cart = await cartService.getOne(cartId)
  
      if (!cartId || !cart) {
        return res.status(404).send({
          status: 404,
          response: 'Get Error: Failed to get Cart: ' + cartId
        })
      }
  
      //Los productos eliminados van a quedar en el cart (eliminarlos)
      const validProducts = cart.products.filter(product => product.productId !== null)
      let totalPrice = 0
      validProducts.forEach((product) => {
        totalPrice += product.productId.price * product.quantity
      })
  
      const data = {
        cartId: cart._id,
        total: totalPrice,
        products: validProducts
      }
      return res.status(200).send({
        status: 200,
        payload: data
      })
    } catch (error) {
      next(error)
    }
  }

  async addToCart(req, res, next) {
    try {
      let emptyCart
      let result
      const productId = req.params.productId
      const quantity = req.params.quantity ?? 0
      let cartId = req.token.cartId ?? null
      const userEmail = req.token.email
      
      if(!userEmail) {
        return res.status(404).send({
          status: 404,
          response: `You must login first`
        })
      }
  
      if (cartId === null) {
        emptyCart = await cartService.createEmpty()
        cartId = emptyCart._id
        await userService.setCartId(userEmail, cartId)
      }
  
      const cart = await cartService.getById(cartId)
      if (!cart) {
        return res.status(404).send({
          status: 404,
          response: `Post Error: Cart ${cartId} not found`
        })
      }

      const product = await productService.getById(productId)
      if(product.stock < quantity) {
        return res.status(400).send({
          status: 400,
          response: `Quantity ${quantity} exceeds stock ${product.stock}`
        })
      }
  
      //Si el producto no existe en el cart lo creamos sino se modifica quantity
      const productExists = cart.products.some(product => product.productId == productId)
      if(!productExists) {
        result = await cartService.create(cartId,productId,quantity)
      }
      if(productExists) {
        result = await cartService.add(cartId,productId,quantity)
      }
  
      return res.status(200).send({
        status: 200,
        response: `Product ${productId} added to cart ${result?._id}!`
      })
    } catch (error) {
      next(error)
    }
  }

  async updateCartProduct(req, res, next) {
    try {
      const cartId = req.token?.cartId ?? null
      const productId = req.params.productId ?? null
      const quantity = req.params.units ?? null
    
      if (!cartId || !productId || !quantity) {
        return res.status(500).send({
          status: 500,
          response: 'Update Error: Missing required data'
        })
      }

      const cartToUpdate = await cartService.getById(cartId)
      if (!cartToUpdate) {
        return res.status(404).send({
          status: 404,
          response: `Update Error: Cart ${cartId} not found`
        })
      }

      const productToUpdate = await productService.getById(productId)
      if (!productToUpdate) {
        return res.status(404).send({
          status: 404,
          response: `Update Error: Product ${productId} not found`
        })
      }

      if(quantity > productToUpdate.stock) {
        return res.status(404).send({
          status: 404,
          response: `Update Error: Quantity(${quantity}) exceeds stock(${productToUpdate.stock})`
        })
      }
    
      const updatedProduct = await cartService.update(cartId, productId, quantity)

      if(!updatedProduct) {
        return res.status(404).send({
          status: 404,
          response: updatedProduct
        })
      }
  
      return res.status(200).send({
        status: 200,
        response: updatedProduct
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteCartProduct(req, res, next) {
    try {
      const cartId = req.token?.cartId ?? null
      const productId = req.params.productId ?? null

      const cart = await cartService.getById(cartId)
      if (!cart) {
        return res.status(404).send({
          status: 404,
          response: `Cart ${cartId} not found`
        })
      }

      const deletedProduct = await cartService.deleteProduct(cartId,productId)
      if(deletedProduct.modifiedCount === 0) {
        return res.status(404).send({
          status: 404,
          response: `Product ${productId} not found in cart ${cartId}`
        })
      }
      return res.status(200).send({
        status: 200,
        response: `Product: ${productId} deleted from cart ${cartId}`
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteCart(req, res, next) {
    try {
      const cartId = req.params.cartId
      const deletedCart = await cartService.deleteCart(cartId)

      if (deletedCart.deletedCount === 0) {
        return res.status(404).json({
          status: 200,
          response: `Cart ${cartId} not found`
        })
      }

      return res.status(200).json({
        status: 200,
        response: `Cart with ID ${cartId} deleted successfully.`
      })
    } catch (error) {
      next(error);
    }
  }

  async purchase(req, res, next) {
    try {
      const userData = req.token
      const cartId = userData.cartId ?? null
      if (!cartId) {
        return res.status(404).json({
          status: 404,
          response: `Cart ${cartId} not found`,
        })
      }
      const cart = await cartService.getById(cartId)
  
      const session = await mongoose.startSession()
      session.startTransaction()
  
      try {
        let indexWithStock = []
        let indexWithoutStock = []
        let amount = 0;
  
        for (let i = 0; i < cart.products.length; i++) {
          let product = await productService.getById(cart.products[i].productId)
          if (cart.products[i].quantity <= product.stock) {
            indexWithStock.push(cart.products[i].productId)
            amount += product.price * cart.products[i].quantity
  
            // Actualiza el stock del producto
            let productId = cart.products[i].productId
            let updatedData = {
              $inc: { stock: -cart.products[i].quantity },
            };
            await productService.updateProduct(
              productId,
              updatedData,
              { new: true }
            )
          } else {
            indexWithoutStock.push(cart.products[i].productId)
          }
        }
  
        // Genera el ticket
        let ticket = {
          code: generateAlphanumericCode(8),
          purchase_datetime: new Date().toLocaleString(),
          amount: amount,
          purchaser: userData.email,
        }
  
        const purchaseOrder = await ticketService.create(ticket);
  
        // Actualiza el carrito
        let deletedproducts
        for (let i = 0; i < indexWithStock.length; i++) {
          deletedproducts = await cartService.deleteProduct(
            cartId,
            indexWithStock[i]
          )
        }
  
        // Commit de la transacción y finaliza la sesión
        await session.commitTransaction()
        session.endSession()

        sendTicketEmail(userData, ticket)
  
        return res.status(200).json({
          success: true,
          payload: {
            ticketId: purchaseOrder._id,
            amount: purchaseOrder.amount,
            date: purchaseOrder.purchase_datetime
          }
        })
      } catch (error) {
        // En caso de error, realiza un rollback de la transacción
        await session.abortTransaction()
        session.endSession()
        throw error
      }
    } catch (error) {
      next(error)
    }
  }
}

export default new CartController()