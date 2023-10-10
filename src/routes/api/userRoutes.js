import { Router } from "express"
import userController from "../../controllers/userController.js"
import validateUserData from "../../middlewares/updateUserValidation.js"
import readToken from "../../middlewares/readToken.js"
import uploaderProfilePhoto from "../../utils/uploaderProfilePhoto.js"
import uploaderDocuments from "../../utils/uploaderDocuments.js"

const {
    setUserRole, getByEmail,
    updateProfile, getUsers,
    deleteUsers, updateRole,
    deleteSingleUser, updatePhoto,
    uploadDocuments
} = userController

const router = Router()

router.get('/', getUsers)

router.get('/:email', getByEmail)

router.post('/premium/:uid', setUserRole)

router.post('/:uid/documents', readToken, uploaderDocuments.fields([
    { name: 'identification', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'accountProof', maxCount: 1 },
  ]), uploadDocuments)

router.put('/update/photo', readToken,  uploaderProfilePhoto.single("photo"), updatePhoto)

router.put('/update/profile', validateUserData, updateProfile)

router.put('/update/:uid', updateRole)

router.delete('/delete/:uid', deleteSingleUser)

router.delete('/', deleteUsers)

export default router