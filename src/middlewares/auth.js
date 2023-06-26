function auth(req, res, next) {
    if (req.session?.email === 'admin@admin.com') {
        return next()
    } else {
        return res.status(401).send('Error de autorizacion!')
    }
}

export default auth