import { Router } from "express"
import userController from "../../controllers/userController.js"
import validateUserData from "../../middlewares/updateUserValidation.js"

const {
    setUserRole, getByEmail,
    updateProfile, getUsers,
    deleteUsers, updateRole,
    deleteSingleUser
} = userController

const router = Router()

router.get('/', getUsers)

router.get('/:email', getByEmail)

router.post('/premium/:uid', setUserRole)

router.post('/:uid/documents', () => {})

router.put('/update/profile', validateUserData, updateProfile)

router.put('/update/:uid', updateRole)

router.delete('/delete/:uid', deleteSingleUser)

router.delete('/', deleteUsers)

export default router