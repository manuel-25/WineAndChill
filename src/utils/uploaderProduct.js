import multer from "multer";
import { __dirname } from '../utils.js'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${__dirname}/../public/img/products`)
    },
    filename: function(req, file, cb) {
        const userId = req.token._id ?? req.token.email
        cb(null, `${userId}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('El archivo no es una imagen válida.'), false)
    }
}

const limits = {
    fileSize: 10 * 1024 * 1024, // Limite de tamaño 10 MB
}

const  uploaderProfilePhoto = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits,
})

export default uploaderProfilePhoto


