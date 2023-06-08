import { model, Schema, Types } from 'mongoose'

const cartSchema = new Schema({
  products: [
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true, },
      quantity: { type: Number, required: true }
    }
  ]
})

const Cart = model('Cart', cartSchema)

export default Cart