function is_same_pass(req, res, next) {
    const { password, confirmPassword } = req.body
    if (password === confirmPassword) {
        delete req.body.confirmPassword
      return next()
    }
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match',
    })
  }
  
  export default is_same_pass