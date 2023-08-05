import productModel from '../Mongo/models/product.model.js'

class ProductManagerDao {
    async getProducts() {
        return await productModel.find({})
    }

    async paginate(query, config) {
        return await productModel.paginate(query, config)
    }

    async findById(productId) {
        return await productModel.findById(productId)
    }
    async create(newProduct) {
        return await productModel.create(newProduct)
    }

    async findByIdAndUpdate(productId, data, config) {
        return await productModel.findByIdAndUpdate(productId, data, config)
    }

    async findByIdAndDelete(productId) {
        return await productModel.findByIdAndDelete(productId)
    }
}

export default ProductManagerDao