import { Router } from "express"
import userController from "../../controllers/userController.js"
import validateUserData from "../../middlewares/updateUserValidation.js"

const {
    setUserRole, getByEmail,
    updateProfile
} = userController

const router = Router()

router.get('/:email', getByEmail)

router.post('/premium/:uid', setUserRole)
router.post('/:uid/documents', () => {})

router.put('/update/profile', validateUserData, updateProfile)

export default router