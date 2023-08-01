import CartModel from '../../models/cart.model.js'

class CartManager {
  async getCarts() {
    try{
      return await CartModel.find({}).populate('products').sort({ 'products.title': 1 })
    } catch(err) {
      return new Error(err)
    }
  }

  async findById(cartId) {
    try {
      return await CartModel.findById(cartId)
    } catch(err) {
      return new Error(err)
    }
  }

  async findOne(cartId) {
    try {
      return await CartModel.findOne({ _id: cartId })
      .populate({
        path: 'products.productId',
        model: 'products',
        select: '-__v'
      })
    } catch(err) {
      return new Error(err)
    }
  }

  async create() {
    try{
      return await CartModel.create({})
    } catch(err) {
        return new Error(err)
    }
  }
}

const cartManagerInstance = new CartManager()

export default cartManagerInstance