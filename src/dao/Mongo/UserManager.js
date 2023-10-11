import UserModel from '../Mongo/models/user.model.js'

class UserManagerDao {
    constructor() {
      this.UserModel = UserModel
    }

    async getAll() {
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

    async updateUser(email, newData) {
      return await UserModel.findOneAndUpdate(
        { email },
        { $set: newData },
        { new: true }
      )
    }

    async updatePhoto(email, newPhoto) {
      return await UserModel.findOneAndUpdate(
        { email },
        { photo: newPhoto },
        { new: true }
      )
    }

    async addDocument(email, document) {
      return await UserModel.findOneAndUpdate(
        { email },
        { $push: { documents: document } },
        { new: true }
      )
    }

    async getDocuments(email) {
      const user = await UserModel.findOne({ email }).select('documents');
      return user?.documents || [];
    }
    

    async delete(id) {
      return await UserModel.findByIdAndDelete(
        id
      )
    }
}

export default UserManagerDao