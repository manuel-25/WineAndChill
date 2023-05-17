import { Router } from "express"
import axios from "axios"

const router = Router()

router.get('/:pid', async (req, res, next) => {
    try {
      const appUrl = `${req.protocol}://${req.headers.host}`
      const productId = Number(req.params.pid)
    
      const response = await axios.get(`${appUrl}/api/products/${productId}`)
      if (response.status === 200) {
        const product = response.data.response
        
        return res.render('products/productDetail', {
          title: 'Product Detail',
          product,
          style: 'productDetail.css',
          script: ''
        })
      } else {
        console.error('Error al obtener los detalles del producto:', response.data)
        // Renderizar una pagina de error o redireccionar a otra pagina
        return res.redirect('/error')
      }
    } catch (error) {
      next(error)
    }
  })

export default router