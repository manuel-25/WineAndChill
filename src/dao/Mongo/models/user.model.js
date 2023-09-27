import { model, Schema, Types } from 'mongoose'

const collection = 'users'

const userSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, default: '/public/img/profile/default.webp' },
  email: { type: String, unique: true, index: true },
  age: { type: Number },
  role: { type: String, default: 'PUBLIC' },
  password: { type: String, required: true },
  cartId: { type: Types.ObjectId, ref: 'carts', default: null },
  chatColor: { type: String, default: null },
  documents: { type: [Schema.Types.Mixed], default: [] },
  last_connection: { type: String, default: null }
})

const UserModel = model(collection, userSchema)

export default UserModel