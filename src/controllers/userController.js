import { userService } from "../Service/index.js"
import { sendAccountDeletedEmail } from "../utils/sendEmail.js"

class UserController {

    async getUsers(req, res, next) {
        try {
            const allUsers = await userService.getAll()
            if(!allUsers) {
                return res.status(400).send({
                    success: false,
                    message: `Unable to get users. Please try again later.`
                })
            }
            const filterArray = allUsers.map((user) => {
                return {
                    _id: user._id,
                    name: user.name,
                    photo: user.photo,
                    email: user.email,
                    age: user.age,
                    role: user.role
                }
            })
            return res.status(200).send({
                success: true,
                payload: filterArray
            })
        } catch (err) {
            next(err)
        }
    }

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

    async deleteUsers(req, res, next) {
        try {
            const allUsers = await userService.getAll();
      
            if (!Array.isArray(allUsers)) {
              return res.status(400).json({
                success: false,
                message: `Unable to get users. Please try again later.`,
              })
            }

            const actualDate = new Date()

            const allUsersFilter = allUsers.filter((user) => {
                return user.role !== "OWNER" && user.role !== "PREMIUM"
            })
      
            const deletedUsers = allUsersFilter
            .filter((user) => {
              const lastConnection = user.last_connection
              const lastConnectionDate = new Date(lastConnection)
              if (lastConnection && !isNaN(lastConnectionDate.getTime())) {
                // Diferencia en milisegundos (cuántos ms desde la última conexión)
                const differenceMilliseconds = actualDate - lastConnectionDate
                const millisecondsToHours = differenceMilliseconds / (1000 * 60 * 60) // Ms a horas
                return millisecondsToHours > 48
              }
              return false
            })
            .map((user) => {
                return {
                  _id: user._id,
                  name: user.name,
                  email: user.email
                }
              })

            if (!deletedUsers || deletedUsers.length === 0) {
                return res.status(400).json({
                  success: false,
                  message: `No users to delete.`,
                })
              }

            for(const user of deletedUsers) {
                await userService.delete(user._id)
                await sendAccountDeletedEmail(user.email, user.name)
            }
      
            res.status(200).json({
                success: true,
                message: `${deletedUsers.length} users deleted.`,
                deletedUsers,
            })
        } catch (err) {
          next(err)
        }
    }
}

export default new UserController()