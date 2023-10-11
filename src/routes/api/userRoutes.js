import { Router } from "express"
import userController from "../../controllers/userController.js"
import validateUserData from "../../middlewares/updateUserValidation.js"
import readToken from "../../middlewares/readToken.js"
import uploaderProfilePhoto from "../../utils/uploaderProfilePhoto.js"
import uploaderDocuments from "../../utils/uploaderDocuments.js"
import authorization from "../../middlewares/authorization.js"


const {
    setUserRole, getByEmail,
    updateProfile, getUsers,
    deleteUsers, updateRole,
    deleteSingleUser, updatePhoto,
    uploadDocuments
} = userController

const router = Router()

router.get('/', authorization('OWNER'), getUsers)
router.get('/:email', authorization('OWNER'), getByEmail)

router.post('/premium/:uid', authorization('OWNER'), setUserRole)
router.post('/:uid/documents', readToken, uploaderDocuments.single('documents'), uploadDocuments)

router.put('/update/photo', readToken,  uploaderProfilePhoto.single("photo"), updatePhoto)
router.put('/update/profile', validateUserData, updateProfile)
router.put('/update/:uid', authorization('OWNER'), updateRole)

router.delete('/delete/:uid', authorization('OWNER'), deleteSingleUser)
router.delete('/', authorization('OWNER'), deleteUsers)

export default router