import { Router } from "express"

const router = Router()

router.get(
    '/test', async (req, res) => {
        try{
            return res.render('index', {
                title: 'Test',
                name: 'manuel',
                products: ['prod1', 'prod2', 'prod3'],
                script: '/public/conection.js'
            })
        } catch (error) {
            next(error)
        }
    }
)

export default router