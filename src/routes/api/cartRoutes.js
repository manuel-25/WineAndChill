import { Router } from "express"
import cart from '../../managers/CartManager.js'
import producto from "../../managers/productManager.js"

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

//si creo un carrito con quantity 0 me crea un {} y se rompen los id
router.post('/', async (req, res) => {
    const { productId, quantity } = req.body
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

        //actualizamos producto dentro de un for y ajustamos stock
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