import passport from "passport"

export default (strategy)=> {
    return async(req,res,next)=> {
        //console.log(req.originalUrl)      implementar
        passport.authenticate(
            strategy,
            (err,user,info)=> {
                if(err) return next(err)
                if(!user) return res.redirect('/login')
                req.user = user
                delete req.user.password
                return next()
            }
        )(req,res,next)
    }
}