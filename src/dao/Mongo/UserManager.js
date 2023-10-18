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

  async update(criteria, update) {
    return await UserModel.findOneAndUpdate(criteria, update, { new: true })
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id)
  }

  async createData(name, email, age, photo, password) {
    const userData = {
      name: name,
      email: email,
      age: age,
      photo: photo,
      password: password
    }
    return await UserModel.create(userData);
  }
}

export default UserManagerDao
