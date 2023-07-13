const loginViewController = (req, res, next) => {
    try {
      return res.render('auth/login', {
        title: 'Login',
        style: 'login.css',
        script: 'login.js'
      })
    } catch (error) {
      next(error)
    }
}
  
export default loginViewController