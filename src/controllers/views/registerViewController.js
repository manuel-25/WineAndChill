const registerViewController = (req, res, next) => {
    try {
        return res.render('auth/register', {
            title: 'Register',
            style: 'register.css',
            script: 'register.js'
        })
    } catch(error) {
        next(error)
    }
}

export default registerViewController