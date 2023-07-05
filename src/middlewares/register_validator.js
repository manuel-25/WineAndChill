function registerValidator(req, res, next) {
    const requiredFields = ['name', 'email', 'password']
    const data = req.body
    
    const missingFields = requiredFields.filter(field => !data[field])
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: 'Complete all fields!', missingFields
      })
    }

    next()
  }
  
  export default registerValidator


