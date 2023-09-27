import { Router } from "express"
import userController from "../../controllers/userController.js"

const {
    setUserRole, getByEmail
} = userController

const router = Router()

router.post('/premium/:uid', setUserRole)
router.get('/:email', getByEmail)
router.post('/:uid/documents', () => {})

export default router