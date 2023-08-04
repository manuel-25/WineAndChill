import productModel from '../Mongo/models/product.model.js'

class ProductManagerDao {
    async getProducts() {
        try {
            return await productModel.find({})
        } catch(error) {
            return new Error(error)
        }
    }

    async paginate(query, config) {
        try {
            return await productModel.paginate(query, config)
        } catch(error) {
            return new Error(error)
        }
    }

    async findById(productId) {
        try {
            return await productModel.findById(productId)
        } catch(error) {
            return new Error(error)
        }
    }
    async create(newProduct) {
        try {
            return await productModel.create(newProduct)
        } catch(error) {
            return new Error(error)
        }
    }

    async findByIdAndUpdate(productId, data, config) {
        try {
            return await productModel.findByIdAndUpdate(productId, data, config)
        } catch (error) {
            return new Error(error)
        }
    }

    async findByIdAndDelete(productId) {
        try {
            return await productModel.findByIdAndDelete(productId)
        } catch (error) {
            return new Error(error)
        }
    }
}

const ProductManager = new ProductManagerDao()

export default ProductManager