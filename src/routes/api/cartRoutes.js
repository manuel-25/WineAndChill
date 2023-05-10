import { Router } from "express"
import cart from '../../managers/CartManager.js'
import producto from "../../managers/productManager.js"
import carrito from "../../managers/CartManager.js"

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const limit = req.query.limit
        let carts = await cart.getCarts()
        if (carts) {
            let cartsToSend = limit ? carts.slice(0, limit) : carts
            return res.status(200).send({
                status: 200,
                response: cartsToSend
            })
        } else {
            return res.status(404).send({
                status: 404,
                response: carts.error || 'unexpected error'
            })
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:cartId', async (req, res) => {
    try {
        let cartId = req.params.cartId
        let result = await cart.getCartById(cartId)
        console.log(result)
        if (!result) {
            return res.status(404).send({
                status: 404,
                response: result.error || 'unexpected error'
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

router.post('/', async (req, res) => {
    try {
        const newCart = await cart.addCart()
        if (newCart && newCart.error) {
            return res.status(404).json({
                status: 404,
                response: newCart.error
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

router.post('/:cartId/product/:pid', async (req, res) => {
    let { cartId, pid } = req.params
    cartId = Number(cartId)
    pid = Number(pid)
    try {
        const newCart = await cart.addCart(cartId, pid)
        if (newCart.error) {
            return res.status(404).json({
                status: 404,
                response: newCart.error
            })
        }
        return res.status(201).json({
            status: 201,
            response: `Product ${pid} created in cart ${newCart.id}!`
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:cartId/product/:pid/:units', async (req, res) => {
    const cartId = req.params.cartId
    const productId = Number(req.params.pid)
    const quantity = Number(req.params.units)

    if (!cartId || !productId || !quantity) {
        return res.status(500).json({
            status: 500,
            response: 'Missing required data'
        })
    }
    try {
        let cartToUpdate = await cart.getCartById(cartId)
        if (cartToUpdate.error) {
            return res.status(404).json({
                status: 404,
                response: cartToUpdate.error
            })
        }

        //busco dentro de un for el producto dentro del array de productos.
        //traigo el producto del carrito y comparo las quantitys. 
        //Actualizo al producto y carrito la quantity.
        //corto el loop.
        let updatedCart = null
        for (let i = 0; i < cartToUpdate.products.length; i++) {
            if (cartToUpdate.products[i].productId === productId) {
                let productFromCart = await producto.getProductById(cartToUpdate.products[i].productId)
                if(quantity > productFromCart.stock) {
                    return res.status(500).json({
                        status: 500,
                        response: 'The quantity you want to add exceeds the available stock.'
                    })
                }
                let updateData = {}
                if (cartToUpdate.products[i].quantity > quantity) {
                    updateData.stock = productFromCart.stock + (cartToUpdate.products[i].quantity - quantity)
                } else {
                    updateData.stock = productFromCart.stock - (quantity - cartToUpdate.products[i].quantity)
                }
                let updatedStock = await producto.updateProduct(productFromCart.id, updateData)
                if (updatedStock.error) {
                    return res.status(500).json({
                        status: 500,
                        error: updatedStock.error
                    })
                }
                cartToUpdate.products[i].quantity = quantity
                updatedCart = cartToUpdate
                break
            }
        }
        if (updatedCart === null) {
            return res.status(404).json({
                status: 404,
                response: 'Product not found in cart'
            })
        }
        let updated = await cart.updateCart(cartId, updatedCart.products)
        if (updated.error) {
            return res.status(500).json({
                status: 500,
                error: updated.error
            })
        }
        //Si no hay errores se corre el status 200
        return res.status(200).json({
            status: 200,
            response: updatedCart
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:cartId/product/:pid/:units', async (req, res) => {
    const cartId = req.params.cartId
    const productId = Number(req.params.pid)
    const unitsToRemove = Number(req.params.units)

    try {
        const cartToDelete = await carrito.getCartById(cartId)
        if (!cart) {
          return res.status(404).json({
                status: 404,
                response: 'Cart not found'
            })
        }

        const productIndex = cartToDelete.products.findIndex((p) => p.productId === productId)
        if (productIndex === -1) {
            return res.status(404).json({
                status: 404,
                response: 'Product not found in cart'
            })
        }

        const product = cartToDelete.products[productIndex]
        if (unitsToRemove > product.quantity) {
            return res.status(400).json({
                status: 400,
                response: 'Units to remove exceed the quantity in the cart'
            })
        }

        product.quantity -= unitsToRemove

        if (product.quantity === 0) {
            cartToDelete.products.splice(productIndex, 1)
        }

        const updatedCart = await carrito.updateCart(cartId, cartToDelete.products)

        if (updatedCart.error) {
            return res.status(500).json({
                status: 500,
                response: 'Error updating cart.'
            })
        }

        return res.status(200).json({
            status: 200,
            response: product
        })

    } catch (error) {
        next(error)
    }
})
  
export default router