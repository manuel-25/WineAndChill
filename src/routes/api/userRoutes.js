import { Router } from "express"
import userController from "../../controllers/userController.js"

const {
    setUserRole
} = userController

const router = Router()

router.post('/premium/:userId', setUserRole)
router.post('/:uid/documents', () => {})

export default router