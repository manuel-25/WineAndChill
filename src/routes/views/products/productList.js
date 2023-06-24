import { Router } from "express"
import axios from "axios"

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const appUrl = `${req.protocol}://${req.headers.host}`
        const limit = parseInt(req.query.limit) ?? 5
        const page = parseInt(req.query.page) ?? 1
        const title = req.query.title

        const response = await axios.get(`${appUrl}/api/products`, {
            params: { limit, page, title }
        })
        const products = response.data.response.docs
        const pagination = response.data.response
  
        if (response.status === 200) {
            return res.render('products/productList', {
                title: 'Products',
                products,
                pag: pagination,
                style: 'productList.css',
                script: 'productList.js'
            })
        } else {
            // Renderizar /products sin productos
            console.error('Error al obtener los productos:', response.data)
        }
    } catch (error) {
      next(error)
    }   
})

export default router