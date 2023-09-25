import multer from "multer"

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ error: 'El archivo es demasiado grande (máx. 10 MB).' })
        } else {
            res.status(400).json({ error: 'Error: ' + err.message })
        }
    } else if (err) {
        res.status(400).json({ error: err.message })
    } else {
        next()
    }
}

export default multerErrorHandler