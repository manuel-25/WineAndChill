function productValidator(req, res, next) {
    const requiredFields = ['title', 'stock', 'description', 'price', 'cellar', ]

    const thumbnail = req.file?.originalname
    req.body.thumbnail = thumbnail ? `/public/img/${req.file.originalname}` : '/public/img/botella_vino.webp'

    const data = req.body
    // Verifica si faltan campos obligatorios
    const missingFields = requiredFields.filter(field => !data[field])
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: 'Complete all fields!',
        missingFields
      })
    }
    req.body = data
    next()
  }
  
  export default productValidator