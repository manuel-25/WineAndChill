import { Router } from "express"
import CartManager from '../../dao/models/CartManager.js'
import readToken from "../../middlewares/readToken.js"

const router = Router()

//Falta ordenar por title
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) ?? 6
    const carts = await CartManager.getCarts()

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
        response: 'Failed to get cart list'
      })
    }
  } catch (error) {
    next(error)
  }
})


router.get('/cartId/:cartId([a-z0-9]+)', async (req, res, next) => {
    try {
        const cartId = req.params.cartId
        const result = await CartManager.findById(cartId)
        if (!result) {
            return res.status(404).send({
                status: 404,
                response: 'Failed to get Cart Id: ', cartId
            })
        }
        return res.status(200).send({
            status: 200,
            response: result
        })
    } catch (error) {
        next(error)
    }
})

router.get('/bills', readToken, async (req, res, next) => {
  try {
    const cartId = req.token?.cartId ?? null
    const cart = await CartManager.findOne(cartId)

    if (!cartId || !cart) {
      return res.status(404).send({
        status: 404,
        response: 'Failed to get Cart: ' + cartId
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
})

//falta asociar el carrito creado al usuario usando token
router.post('/:cartId?/product/:productId([a-z0-9]+)/:quantity([a-z0-9]+)', readToken, async (req, res, next) => {
  try {
    let emptyCart
    let result
    let cartId = req.params.cartId ?? null
    console.log(req.params.cartId)
    if(cartId === ':cartId') { cartId = null }
    const productId = req.params.productId
    const quantity = req.params.quantity ?? 0
    //const userEmail = req.token.email

    if (cartId === null) {
      emptyCart = await CartManager.create()
      cartId = emptyCart._id
    }

    const cart = await CartManager.findById(cartId)
    if (!cart) {
      return res.status(404).send({
        status: 404,
        response: `Cart ${cartId} not found`
      })
    }

    //Si el producto no existe en el cart lo creamos sino se modifica quantity
    const productExists = cart.products.some(product => product.productId == productId)
    if(!productExists) {
      result = await CartManager.addToEmptyCart(cartId,productId,quantity)
    }
    if(productExists) {
      result = await CartManager.addToCart(cartId,productId,quantity)
    }

    return res.status(200).send({
      status: 200,
      response: `Product ${productId} added to cart ${result?._id}!`
    })
  } catch (error) {
    next(error)
  }
})

/*router.put('/:cartId([a-z0-9]+)/product/:pid([a-z0-9]+)/:units', async (req, res, next) => {
    const cartId = req.params.cartId
    const productId = req.params.pid
    const quantity = req.params.units
  
    if (!cartId || !productId || !quantity) {
      return res.status(500).send({
        status: 500,
        response: 'Missing required data'
      })
    }
  
    try {
      let cartToUpdate = await Cart.findById(cartId)
  
      if (!cartToUpdate) {
        return res.status(404).send({
          status: 404,
          response: 'Cart not found'
        })
      }
  
      let productToUpdate = cartToUpdate.products.find(product => product.productId.toString() === productId.toString())
  
      if (!productToUpdate) {
        return res.status(404).send({
          status: 404,
          response: 'Product not found in cart'
        })
      }
  
      let productFromCart = await Product.findById(productId)
  
      if (!productFromCart) {
        return res.status(404).send({
          status: 404,
          response: 'Product not found'
        })
      }
  
      if (quantity > productFromCart.stock) {
        return res.status(500).send({
          status: 500,
          response: 'The quantity you want to add exceeds the available stock.'
        })
      }
  
      const previousQuantity = productToUpdate.quantity
      const quantityDiff = quantity - previousQuantity
  
      productToUpdate.quantity = quantity
      cartToUpdate.products.set(cartToUpdate.products.findIndex(product => product.productId.toString() === productId.toString()), productToUpdate)
  
      const updatedCart = await cartToUpdate.save()
  
      if (quantityDiff !== 0) {
        const updateData = {
          stock: productFromCart.stock - quantityDiff
        }
  
        const updatedStock = await Product.findByIdAndUpdate(productId, updateData, { new: true })
  
        if (!updatedStock) {
          return res.status(500).send({
            status: 500,
            response: 'Failed to update product stock'
          })
        }
      }
  
      return res.status(200).send({
        status: 200,
        response: updatedCart
      })
    } catch (error) {
      next(error)
    }
  })*/

  router.delete('/:cartId([a-z0-9]+)/product/:productId([a-z0-9]+)/', async (req, res, next) => {
    try {
      const cartId = req.params.cartId
      const productId = req.params.productId

      const cart = await CartManager.findById(cartId)
  
      if (!cart) {
        return res.status(404).send({
          status: 404,
          response: `Cart ${cartId} not found`
        })
      }

      const deletedProduct = await CartManager.deleteProduct(cartId,productId)
  
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
  })

  router.delete('/:cartId([a-z0-9]+)', async (req, res, next) => {
    try {
      const cartId = req.params.cartId
      const deletedCart = await CartManager.deleteCart(cartId)

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
      next(error)
    }
  })
  
export default router