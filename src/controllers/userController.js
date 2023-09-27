import { userService } from "../Service/index.js"

class UserController {
    async setUserRole(req, res, next) {
        try {
            const userId = req.params.userId

            const userData = await userService.getById(userId)
            if(!userData) {
                return res.status(404).send({
                    success: false,
                    message: `User id: ${userId} not found`
                })
            }
    
            if(userData.role === 'PUBLIC') {
                const data = await userService.setRole(userId, 'PREMIUM')
                return res.status(200).send({
                    success: true,
                    message: `User id: ${userId} role: ${data.role}`
                })
            } else {
                const data = await userService.setRole(userId, 'PUBLIC')
                return res.status(200).send({
                    success: true,
                    message: `User id: ${userId} role: ${data.role}`
                })
            }
        } catch (err) {
            next(err)
        }
    }

    async getByEmail(req, res, next) {
        try {
            const userEmail = req.params.email 
            const user = await userService.getByEmail(userEmail)
            console.log(user)
            return res.status(200).send({
                success: true,
                payload: user
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new UserController()