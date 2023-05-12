import { Router } from "express"
import producto from "../../managers/ProductManager.js"

const router = Router()

router.get(
    '/', async (req, res) => {
        try{
            let products = await producto.getProducts()
            if(!products) {
                return res.status(404).json({
                    message: "No hay productos registrados"
                })
            }
            console.log(products)
            return res.render('index', {
                title: 'Home',
                products,
                style: 'index.css',
                script: '/public/conection.js'
            })
        } catch (error) {
            next(error)
        }
    }
)

export default router