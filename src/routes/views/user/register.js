import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    try {
        return res.render('auth/register', {
            title: 'Register',
            style: 'register.css',
            script: 'register.js'
        })
    } catch(error) {
        console.log(error)
    }
})

export default router