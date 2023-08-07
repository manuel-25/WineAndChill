import ProductModel from '../Mongo/models/product.model.js'

class ProductManagerDao {
    constructor() {
        this.ProductModel = ProductModel
      }

    async getProducts() {
        return await ProductModel.find({})
    }

    async paginate(query, config) {
        return await ProductModel.paginate(query, config)
    }

    async findById(productId) {
        return await ProductModel.findById(productId)
    }
    async create(newProduct) {
        return await ProductModel.create(newProduct)
    }

    async findByIdAndUpdate(productId, data, config) {
        return await ProductModel.findByIdAndUpdate(productId, data, config)
    }

    async findByIdAndDelete(productId) {
        return await ProductModel.findByIdAndDelete(productId)
    }
}

export default ProductManagerDao