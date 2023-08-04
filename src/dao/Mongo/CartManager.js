import CartModel from './models/cart.model.js'

class CartManagerDao {
  constructor() {
    this.CartModel = CartModel
  }

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

  async addToEmptyCart(cartId, productId, quantity) {
    try {
      return await CartModel.findByIdAndUpdate(
        cartId,
        { $push: { products: { productId, quantity } } },
        { new: true }
      )
    } catch (err) {
      throw new Error(err);
    }
  }
  
  async addToCart(cartId, productId, quantity) {
    try {
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
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateProduct(cartId, productId, quantity) {
    try{
      return await CartModel.findOneAndUpdate(
        {_id: cartId, 'products.productId': productId},
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      )
    } catch(err) {
        return new Error(err)
    }
  }
  
  async deleteProduct(cartId, productId) {
    try {
      const deletedProduct = await CartModel.updateOne(
        {_id : cartId},
        {$pull: {products: {productId}} }
      )
      return deletedProduct
    } catch(err) {
      throw new Error(err)
    }
  }

  async deleteCart(cartId) {
    try {
      const deletedCart = await CartModel.deleteOne({_id: cartId})
      return deletedCart
    } catch (err) {
      throw new Error(err)
    }
  }
}

const CartManager = new CartManagerDao()

export default CartManager