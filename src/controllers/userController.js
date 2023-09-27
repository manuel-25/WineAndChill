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
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found'
                })
            }
            return res.status(200).send({
                success: true,
                payload: user
            })
        } catch (err) {
            next(err)
        }
    }

    async updateProfile(req, res, next) {
        try {
            console.log(req.body)
            console.log(req.email)
            const data = req.body
            const email =  req.email 
            
            const updated = await userService.updateUser(email, data)
            
            if(!updated) return res.status(400).send({
                success: false,
                message: 'Error updating, please try again',
            })

            return res.status(200).send({
                success: true,
                message: 'Information updated!',
                payload: updated
            })

        } catch (err) {
            next(err)
        }
    }
}

export default new UserController()