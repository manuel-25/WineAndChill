import { Router } from "express"
import cart from '../../managers/CartManager.js'

const router = Router()

router.get('/', async (req, res) => {
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
        console.log(error)
        return res.status(500).send({
            status: 500,
            response: 'Error retrieving carts.'
        })
    }
})

router.get('/:cartId', async (req, res) => {
    try {
        let cartId = req.params.cartId;
        let result = await cart.getCartById(cartId)
        console.log(result)
        if (!result) {
            return res.status(404).send({
                status: 404,
                response: result.error || 'unexpected error'
            });
        }
        return res.status(200).send({
            status: 200,
            response: result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            response: error
        })
    }
})

router.post('/', async (req, res) => {
    const { productId, quantity } = req.body

    // Validamos si productId y quantity estan definidos y son numeros
    if (!productId || !quantity || isNaN(productId) || isNaN(quantity)) {
        return res.status(500).json({
            status: 500,
            response: 'Invalid product or quantity.'
        })
    }
    try {
        const newCart = await cart.addCart(productId, quantity)
        if (newCart && newCart.error) {
            return res.status(404).json({
                status: 404,
                response: newCart.error
            })
        }
        return res.status(201).json({
            status: 201,
            response: `Cart ${newCart.id} created!`
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 500,
            response: 'Error creating cart.', err
        })
    }
})

router.put('/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId
        const productId = req.body.productId
        const quantity = req.body.quantity

        if (!cartId || !productId || !quantity) {
            return res.status(500).json({
                status: 500,
                response: 'Missing required data'
            })
        }
        let cartToUpdate = await cart.getCartById(cartId)
        if (cartToUpdate.error) {
            return res.status(404).json({
                status: 404,
                response: cartToUpdate.error
            })
        }
        
        let updatedCart = null
        for (let i = 0; i < cartToUpdate.products.length; i++) {
            console.log(`Product ${i}: ${JSON.stringify(cartToUpdate.products[i])}`)
            if (cartToUpdate.products[i].productId == productId) {
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
        let updated = await cart.updateCart(cartId, updatedCart)
        console.log(updated)
        return res.status(201).json({
            status: 201,
            response: updatedCart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            response: 'Error updating cart'
        })
    }
})

export default router