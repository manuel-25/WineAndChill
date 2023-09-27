function validateUserData(req, res, next) {
    req.body.address = req.body.address.toUpperCase()
    req.email = req.body.email
    delete req.body.email

    // Validación de campos vacíos
    for (const key in req.body) {
        if (req.body[key] === '') {
          delete req.body[key]
        }
    }
    next()
}

export default validateUserData