import multer from 'multer'
import { __dirname } from '../utils.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/documents`)
  },
  filename: function (req, file, cb) {
    const userId = req.token._id;
    cb(null, `${userId}-${file.originalname}`)
  },
})

const limits = {
  fileSize: 20 * 1024 * 1024, // Límite de tamaño de 20 MB
}

const uploaderDocuments = multer({
  storage: storage,
  limits: limits,
})

export default uploaderDocuments
