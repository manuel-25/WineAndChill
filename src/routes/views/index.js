import { Router } from "express"
import axios from "axios"

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const limit = 4
        let page = parseInt(req.query.page)
        let products
        let totalPages
        let totalProducts
        let pageNumbers = []

        const response = await axios.get('http://localhost:8080/api/products', {
            params: {
            limit,
            page
            }
        })
  
        if (response.status === 200) {
            let responseClean = response.data.response;
            products = responseClean.products;
            totalPages = responseClean.totalPages;
            totalProducts = responseClean.totalProducts;
    
            // Calcula los números de página
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push({
                    pageNumber: i,
                    active: i === page // Marca la página actual como activa
                })
            }
        } else {
            // Renderizar index sin productos
            console.error('Error al obtener los productos:', response.data)
        }
  
        return res.render('index', {
            title: 'Home',
            products,
            totalPages,
            totalProducts,
            pageNumbers,
            style: 'index.css',
            script: '/public/conection.js'
        })
    } catch (error) {
      next(error)
    }
  })

export default router