import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    try {
        return res.render('auth/login', {
            title: 'Login',
            style: 'login.css',
            script: 'login.js'
        })
    } catch(error) {
        console.log(error)
    }
})

export default router