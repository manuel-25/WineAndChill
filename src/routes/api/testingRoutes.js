import Router from 'express'
import { generateProductArray } from '../../utils/mocks/generateUserFaker.js'

const router = Router()

router.get('/mockingproducts', (req, res) => {
    const products = generateProductArray(100)
    return res.send(products)
})

export default router