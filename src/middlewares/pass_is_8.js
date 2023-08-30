function pass_is_8(req, res, next) {
    const { password } = req.body
    console.log(password)
    if (password.length >= 8) {
      return next()
    }
    return res.status(400).json({
      success: false,
      message: 'Password must be at least eight characters long',
    })
  }
  
  export default pass_is_8