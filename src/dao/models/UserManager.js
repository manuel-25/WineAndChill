import UserModel from '../../models/user.model.js'

class UserManagerDao {
    async getUsers() {
        try{
            return await UserModel.find({})
          } catch(err) {
            return new Error(err)
          }
    }

    async findById(userId) {
        try {
          return await UserModel.findById(userId)
        } catch(err) {
          return new Error(err)
        }
    }

    async findByEmail(email) {
        try {
          return await UserModel.findOne({ email: email })
        } catch(err) {
          return new Error(err)
        }
    }

    async create(data) {
        try{
            return await UserModel.create(data)
          } catch(err) {
            return new Error(err)
        }
    }

    async createData(name, email, age, photo, password) {
        try{
            return await UserModel.create({name, email, age, photo, password})
          } catch(err) {
            return new Error(err)
        }
    }

    async deleteUser(email) {
        try{
            return await UserModel.deleteOne({email: email})
          } catch(err) {
            return new Error(err)
        }
    }
}

const UserManager = new UserManagerDao()

export default UserManager