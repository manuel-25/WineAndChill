function isAdmin(req, res, next) {
    if (req.user?.role === 1) {
        return next()
    } else {
        return res.status(401).json({
            success: false,
            message: 'Authentication error!'
        })
    }
}

export default isAdmin