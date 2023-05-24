function productValidator(req, res, next) {
    const requiredFields = ['title', 'description', 'stock', 'price', 'category']
    const defaultValues = {
      status: true,
      thumbnail: '/public/img/botella_vino.webp'
    }
  
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
  
    // Asigna los valores por defecto si no están presentes
    Object.entries(defaultValues).forEach(([field, value]) => {
      if (!data[field]) {
        data[field] = value
      }
    })
  
    req.body = data
    next()
  }
  
  export default productValidator