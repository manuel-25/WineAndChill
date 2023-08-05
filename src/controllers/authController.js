class authController {
    register(req, res) {
        return res.status(200).send({
            success: true,
            message: 'User created!'
        })
    }

    failRegister(req, res) {
        res.status(400).send({
            success: false,
            message: 'Registration failed.'
        })
    }

    async signIn(req, res, next) {
        return res.status(200).send({ success: true })
    }

    failSignIn(req, res) {
        res.status(400).json({
            success:false,
            message: 'Signin failed'
        })
    }

    githubCallback(req, res) {
        res.status(200).redirect('/products')
    }

    failGithub(req, res) {
        res.status(403).json({
            success: false,
            message: 'Bad Authentication'
        })
    }

    signOut(req, res) {
        delete req.user
        res.clearCookie('token')
        res.clearCookie('rememberMe')
        res.redirect('/login')
    }
}

export default new authController()