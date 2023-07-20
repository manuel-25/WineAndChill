function authorization (role) {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({status: 'error', message: 'User not logged in' })
        if(req.user.role !== role) return res.status(403).send({status: 'error', message: 'Permission denied'})
        next()
    }
}

export default authorization