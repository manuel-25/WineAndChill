import { model, Schema, Types } from 'mongoose'
import Product from './product.model.js'

const collection = 'carts'
const schema = new Schema({
  products: [{
    productId: { type: Types.ObjectId, ref: 'Product', required: true, index: true },
    quantity: { type: Number, required: true }
  }]
})

schema.pre('find', function() {
  this.populate({
    path: 'products.productId',
    model: 'products',
    select: 'title'
  })
})

const CartModel = model(collection, schema)

export default CartModel