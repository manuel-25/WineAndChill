import UserModel from '../Mongo/models/user.model.js'

class UserManagerDao {
    constructor() {
      this.UserModel = UserModel
    }

    async getUsers() {
      return await UserModel.find({})
    }

    async getById(userId) {
      return await UserModel.findById(userId)
    }

    async getByEmail(email) {
      return await UserModel.findOne({ email: email })
    }

    async create(data) {
      return await UserModel.create(data)
    }

    async createData(name, email, age, photo, password) {
      return await UserModel.create({name, email, age, photo, password, photo})
    }

    async deleteUser(email) {
      return await UserModel.deleteOne({email: email})
    }

    async setColor(id, color) {
      return await UserModel.findByIdAndUpdate(
        id,
        { $set: { chatColor: color } },
        { new: true }
      )
    }

    async getColorById(id) {
      return await UserModel.findById(id).then(user => user?.chatColor)
    }

    async setCartId(email, cartId) {
      return await UserModel.findOneAndUpdate(
        { email: email },
        { cartId: cartId },
        { new: true }
      )
    }

    async setPassword(email, password) {
      return await UserModel.findOneAndUpdate(
        { email: email },
        { password: password },
        { new: true }
      )
    }

    async setRole(id, role) {
      return await UserModel.findByIdAndUpdate(
        id,
        { role: role },
        { new: true }
      )
    }

    async setLasConnection(id, date) {
      return await UserModel.findByIdAndUpdate(
        id,
        { last_connection: date},
        { new :true }
      )
    }
}

export default UserManagerDao