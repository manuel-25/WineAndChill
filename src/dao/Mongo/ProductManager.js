import ProductModel from '../Mongo/models/product.model.js'

class ProductManagerDao {
    constructor() {
        this.ProductModel = ProductModel
      }

    async getAll() {
        return await ProductModel.find({})
    }

    async paginate(query, config) {
        return await ProductModel.paginate(query, config)
    }

    async getById(productId) {
        return await ProductModel.findById(productId)
    }
    async create(newProduct) {
        return await ProductModel.create(newProduct)
    }

    async update(productId, data, config) {
        return await ProductModel.findByIdAndUpdate(productId, data, config)
    }

    async delete(productId) {
        return await ProductModel.findByIdAndDelete(productId)
    }
}

export default ProductManagerDao