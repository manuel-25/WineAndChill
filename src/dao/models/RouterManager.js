import { Router } from 'express'
import { Jwt } from 'jsonwebtoken'

class Router{
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter() {
        return this.router
    }

    init() {

    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async(params) => {     //mid1, mid2, func(req, res, next)
            try {
                await callback.apply(this, params)  //params: req, res, next
            } catch(error) {
                params[2](error)
            }
        })
    }

    generateCustomResponse(req, res ,next) {
        res.sendSuccess = payload => res.send({status: 'success', payload})
        res.sendServerError = error => res.send({status: 'error', error})
        res.sendUserError = error => res.send({status: 'error', error})
        next()
    }

    handlePolicies = policies => (req, res, next) => {
        if(policies[0] === 'PUBLIC') return next()
        const authHeader = req.headers.authorization
        if(!authHeader) return res.status(401).send({status:'error', message: 'Unauthorized'})
        const token = authHeader.split(' ')[1]
        const user = Jwt.verify(token, 'CLAVE')
        if(!policies.includes(user.role.toUpperCase())) {
            return res.status(403).send({status: 'error', message: 'Not authorized!'})
        }
        req.user = user
        next()
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }
    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }
    put(path, policies, ...callbacks) {
        this.router.put(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }
    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

}

export default Router