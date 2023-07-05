import { Router } from "express"
import Product from '../../models/product.model.js'
import Cart from "../../models/cart.model.js"
import { Types } from "mongoose"

const router = Router()

//Falta ordenar por title
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) ?? 6
    const carts = await Cart.find().populate('products').sort({ 'products.title': 1 })

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


router.get('/:cartId', async (req, res, next) => {
    try {
        const cartId = req.params.cartId
        const result = await Cart.findById(cartId)
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

router.get('/bills/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId

    const cart = await Cart.findOne({ _id: cartId })
      .populate({
        path: 'products.productId',
        model: 'products',
        select: '-__v'
      })

    if (!cart) {
      return res.status(404).send({
        status: 404,
        response: 'Failed to get Cart with Id: ' + cartId
      })
    }

    let totalPrice = 0
    cart.products.forEach((product) => {
      totalPrice += product.productId.price * product.quantity
    })

    return res.status(200).send({
      status: 200,
      response: {
        cartId: cart._id,
        total: totalPrice,
        products: cart.products
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
    try {
        const newCart = await Cart.create({})
        if (!newCart) {
            return res.status(404).json({
                status: 404,
                response: 'Failed to create empty cart'
            })
        }
        return res.status(201).json({
            status: 201,
            response: `Empty cart ${newCart.id} created!`
        })
    } catch (error) {
        next(error)
    }
})

router.post('/:cartId/product/:pid', async (req, res, next) => {
  const cartId = req.params.cartId
  const pid = req.params.pid
  
  try {
    const cart = await Cart.findById(cartId)

    if (!cart) {
      return res.status(404).json({
        status: 404,
        response: 'Cart not found'
      })
    }
    
    const existingProduct = cart.products.find(product => product.productId.toString() === pid)

    if (existingProduct) {
      // El producto ya existe en el carrito, incrementa la cantidad
      existingProduct.quantity += 1
    } else {
      // El producto no existe en el carrito, agrégalo como un nuevo objeto
      cart.products.push({ productId: pid, quantity: 1 })
    }

    const updatedCart = await cart.save()

    return res.status(200).json({
      status: 200,
      response: `Product ${pid} added to cart ${updatedCart._id}!`
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:cartId/product/:pid/:units', async (req, res, next) => {
    const cartId = req.params.cartId
    const productId = req.params.pid
    const quantity = req.params.units
  
    if (!cartId || !productId || !quantity) {
      return res.status(500).json({
        status: 500,
        response: 'Missing required data'
      })
    }
  
    try {
      let cartToUpdate = await Cart.findById(cartId)
  
      if (!cartToUpdate) {
        return res.status(404).json({
          status: 404,
          response: 'Cart not found'
        })
      }
  
      let productToUpdate = cartToUpdate.products.find(product => product.productId.toString() === productId.toString())
  
      if (!productToUpdate) {
        return res.status(404).json({
          status: 404,
          response: 'Product not found in cart'
        })
      }
  
      let productFromCart = await Product.findById(productId)
  
      if (!productFromCart) {
        return res.status(404).json({
          status: 404,
          response: 'Product not found'
        })
      }
  
      if (quantity > productFromCart.stock) {
        return res.status(500).json({
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
          return res.status(500).json({
            status: 500,
            response: 'Failed to update product stock'
          })
        }
      }
  
      return res.status(200).json({
        status: 200,
        response: updatedCart
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:cartId/product/:pid/', async (req, res, next) => {
    const cartId = req.params.cartId
    const productId = req.params.pid
  
    try {
      const cartToUpdate = await Cart.findById(cartId)
  
      if (!cartToUpdate) {
        return res.status(404).json({
          status: 404,
          response: 'Cart not found'
        })
      }
  
      const productIndex = cartToUpdate.products.findIndex(product => product.productId.toString() === productId.toString())
  
      if (productIndex === -1) {
        return res.status(404).json({
          status: 404,
          response: 'Product not found in cart'
        })
      }
  
      cartToUpdate.products.splice(productIndex, 1)
  
      const updatedCart = await cartToUpdate.save()
  
      return res.status(200).json({
        status: 200,
        response: updatedCart
      })
    } catch (error) {
      next(error)
    }
  })
  
export default router