import passport from "passport";
import { Strategy } from "passport-local";
import UserModel from '../models/user.model.js'
import GHStrategy from 'passport-github2'
import jwt from 'passport-jwt'

const { GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env
const callbackURL = 'http://localhost:8080/api/auth/github/callback'

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
                        delete req.body.password                            //elimino contraseñas despues de crear el user
                        user.password = null
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
    ),
    passport.use(
        'github',
        new GHStrategy(
            { clientID:GH_CLIENT_ID,clientSecret:GH_CLIENT_SECRET,callbackURL: callbackURL }, //objeto de configuracion
            async (accessToken,refreshToken,profile,done) => {
                try {
                    //console.log(profile)
                    const one = await UserModel.findOne({ email:profile._json.login })
                    if (!one) {
                        const user = await UserModel.create({
                            name:profile._json.name,
                            email:profile._json.login,
                            age: 0,
                            photo:profile._json.avatar_url,
                            password:profile._json.id
                        })
                        return done(null,user)	//si no lo encuentra lo crea y envía
                    }
                    return done(null,one)		//si encuentra el usuario lo envía
                } catch (error) {
                    return done(error)
                }
            }
        )
    ),
    passport.use(       //SOLO PARA AUTENTICAR USUARIOS
        'jwt',
        new jwt.Strategy({
            jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req)=>req?.cookies['token']]),  //extraer la cookie para leerla
            secretOrKey: process.env.SECRET_JWT
        },
        async (jwt_payload,done) => {
            try {              
                const user = await UserModel.findOne({ email:jwt_payload.email })
                delete user.password
                if (user) {    
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'not auth'})
                }
            } catch (error) {
                return done(error,false)
            }
        })
    )


    
}