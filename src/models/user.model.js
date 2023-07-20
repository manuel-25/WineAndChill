import { model, Schema, Types } from 'mongoose'

const collection = 'users'

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  photo: { type: String, default: 'default.jpg' },
  email: { type: String, unique: true, index: true },
  age: { type: Number },
  role: { type: Number, enum: [0, 1], default: 0 },
  password: { type: String, required: true },
  cartId: { type: Types.ObjectId, ref: 'carts' }
})

const UserModel = model(collection, userSchema)

export default UserModel