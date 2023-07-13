export  default function(req, res, next) {
    let user
    if(req.session && req.session.email) {
        user = {
            email: req.session.email,
            role: req.session.role
        }
        res.locals.user = user
    }
    next()
}