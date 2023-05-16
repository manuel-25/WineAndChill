import { Router } from "express";

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        res.render('chat/chat', {
            title: 'Chat',
            style: 'chat.css',
            script: 'chatScript.js'
        })
    } catch (error) {
        next(error)
    }
})

export default router