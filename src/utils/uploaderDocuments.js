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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('El archivo no es válido. Solo se permiten PDF, JPEG y PNG.'), false)
  }
}

const limits = {
  fileSize: 20 * 1024 * 1024, // Límite de tamaño de 20 MB
}

const uploaderDocuments = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
})

export default uploaderDocuments
