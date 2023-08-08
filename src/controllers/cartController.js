import { userService, productService, cartService } from "../Service/index.js"


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
  
      let totalPrice = 0
      cart.products.forEach((product) => {
        totalPrice += product.productId.price * product.quantity
      })
  
      const data = {
        cartId: cart._id,
        total: totalPrice,
        products: cart.products
      }
      return res.status(200).send({
        status: 200,
        data
      })
    } catch (error) {
      next(error)
    }
  }

  async addToCart(req, res, next) {
    try {
      let emptyCart
      let result
      let cartId = req.params.cartId
      if(cartId === ':cartId') { cartId = null }
      const productId = req.params.productId
      const quantity = req.params.quantity ?? 0
      const userEmail = req.token.email
      console.log('token', req.token)
      
  
      if (cartId === null) {
        emptyCart = await cartService.createEmpty()
        cartId = emptyCart._id
      }
  
      const cart = await cartService.getById(cartId)
      if (!cart) {
        return res.status(404).send({
          status: 404,
          response: `Post Error: Cart ${cartId} not found`
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
      const cartId = req.params.cartId ?? null
      const productId = req.params.productId ?? null
      const quantity = req.params.units ?? null
    
      if (!cartId || !productId || !quantity) {
        return res.status(500).send({
          status: 500,
          response: 'Update Error: Missing required data'
        })
      }

      const cartToUpdate = await cartService.getId(cartId)
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
      const cartId = req.params.cartId
      const productId = req.params.productId

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
}

export default new CartController()