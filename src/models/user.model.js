import { model, Schema } from 'mongoose'

const collection = 'users'

const userSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, default: 'default.jpg' },
  email: { type: String, unique: true, index: true },
  age: { type: Number },
  role: { type: Number, enum: [0, 1], default: 0 },
  password: { type: String, required: true }
})

const UserModel = model(collection, userSchema)

export default UserModel