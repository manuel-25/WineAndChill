import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {
    try {
        return res.render('products/newProduct', {
            title: 'Create new product',
            style: 'newProduct.css',
            script: 'newProduct.js'
        })
    } catch(error) {
        console.log(error)
    }
})

export default router