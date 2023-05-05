import { Router } from "express"
import producto from './productManager.js'

const router = Router()

router.get('/api/products', async (req, res) => {
        try {
            const limit = req.query.limit
            let products = await producto.getProducts()
            if (products) {
            let productsToSend = limit ? products.slice(0, limit) : products
            return res.send({
                success: true,
                products: productsToSend
            })
            } else {
            return res.send({
                success: false,
                message: 'No products found'
            })
            }
        } catch (error) {
            console.log(error)
        }
    })

  export default router