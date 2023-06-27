function auth(req, res, next) {
    if (req.session?.email === 'admin@admin.com') {
        return next()
    } else {
        return res.status(401).json({
            success: false,
            message: 'Authentication error!'
        })
    }
}

export default auth