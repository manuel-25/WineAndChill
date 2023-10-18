import passport from "passport";
import { Strategy } from "passport-local";
import { userService } from "../Service/index.js";
import GHStrategy from 'passport-github2'
import jwt from 'passport-jwt'

const { GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env
const callbackURL = 'http://localhost:8080/api/auth/github/callback'

export default function() {
    passport.use(
        'register',
        new Strategy(
            { passReqToCallback: true, usernameField: 'email'}, //objeto de requerimientos
            async (req, username, password, done) => {
                try {
                    const one = await userService.getByEmail(username) // o req.body.email
                    if (!one) {
                        const user = await userService.create(req.body)
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
                    const one = await userService.getByEmail(username)
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
            { clientID:GH_CLIENT_ID,clientSecret:GH_CLIENT_SECRET,callbackURL: callbackURL, session: false }, //objeto de configuracion
            async (accessToken,refreshToken,profile,done) => {
                try {
                    const one = await userService.getByEmail(profile._json.email)
                    if (!one) {
                        const user = await userService.createData({
                            name:profile._json.name,
                            email:profile._json.email,
                            age: null,
                            photo:profile._json.avatar_url,
                            password:profile._json.id,
                            photo: profile._json.avatar_url
                        })
                        return done(null,user)
                    }
                    return done(null,one)
                } catch (error) {
                    return done(error)
                }
            }
        )
    ),
    passport.use(       //SOLO PARA AUTENTICAR USUARIOS
        'jwt',
        new jwt.Strategy({
            jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req)=>req?.cookies['token'] || jwt.ExtractJwt.fromAuthHeaderAsBearerToken()]),  //extraer la cookie para leerla, si no existe extraer el token del header
            secretOrKey: process.env.SECRET_JWT
        },
        async (jwt_payload,done) => {
            try {              
                const user = await userService.getByEmail(jwt_payload.email)
                delete user.password
                if (user) {    
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'No JWT Auth'})
                }
            } catch (error) {
                return done(error,false)
            }
        })
    )
}