import passport from "passport"

export default (strategy)=> {
    return async(req,res,next)=> {
        passport.authenticate(
            strategy,
            (err,user,info)=> {
                if(err) return next(err)
                if(!user) return res.status(401).send({ error: info.message ? info.message : info.toString() })
                req.user = user
                delete req.user.password
                return next()
            }
        )(req,res,next)
    }
}