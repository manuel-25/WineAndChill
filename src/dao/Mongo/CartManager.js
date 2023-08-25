import CartModel from './models/cart.model.js'

class CartManagerDao {
  constructor() {
    this.CartModel = CartModel
  }

  async getAll() {
    return await CartModel.find({}).populate('products').sort({ 'products.title': 1 })
  }

  async getById(cartId) {
    return await CartModel.findById(cartId)
  }

  async getOne(cartId) {
    return await CartModel.findOne({ _id: cartId })
      .populate({
        path: 'products.productId',
        model: 'products',
        select: '-__v'
      })
  }

  async createEmpty() {
    return await CartModel.create({})
  }

  async create(cartId, productId, quantity) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { $push: { products: { productId, quantity } } },
      { new: true }
    )
  }
  
  async add(cartId, productId, quantity) {
    return await CartModel.findOneAndUpdate(
      {
        _id: cartId,
        'products.productId': productId,
      },
      {
        $inc: { 'products.$.quantity': quantity },
       },
      { new: true }
    )
  }

  async update(cartId, productId, quantity) {
    return await CartModel.findOneAndUpdate(
      {_id: cartId, 'products.productId': productId},
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    )
  }
  
  async deleteProduct(cartId, productId) {
    return await CartModel.updateOne(
      {_id : cartId},
      {$pull: {products: {productId}} }
    )
  }

  async deleteCart(cartId) {
    return await CartModel.deleteOne({_id: cartId})
  }
}

export default CartManagerDao