import passport from "passport";
import { Strategy } from "passport-local";
import UserModel from '../models/user.model.js'

export default function() {
    passport.serializeUser(
        (user,done) => done(null, user._id)
    )
    passport.deserializeUser(
        async(id,done) => {
            const user = await UserModel.findById(id)
            return done(null, user)
        }
    )
    passport.use(
        'register',                                                         //Nombre de la estrategia
        new Strategy(
            { passReqToCallback: true, usernameField: 'email'}, //objeto de requerimientos
            async (req, username, password, done) => {
                try {
                    const one = await UserModel.findOne({ email: username }) // o req.body.email
                    if (!one) {
                        const user = await UserModel.create(req.body)
                        return done(null,user)                              // se completa la deserializacion 
                    }
                    return done(null, false)
                } catch(error) {
                    return done(error, false)
                }
            }

        )
    ),
    passport.use(
        'signin',
        new Strategy(
            { usernameField:'email' },
            async (username,password,done) => {
                try {
                    const one = await UserModel.findOne({ email:username })
                    if (!one) {
                        return done(null,false)
                    }
                    return done(null,one)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    
}