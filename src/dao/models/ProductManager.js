import productModel from '../../models/product.model.js'

class ProductManager {
    async getProducts() {
        try {
            return await productModel.find({})
        } catch(error) {
            return new Error(error)
        }
    }

    async getProductById(pid) {
        try {
            return await productModel.findOne({_id: pid})
        } catch(error) {
            return new Error(error)
        }
    }
    async addProduct(newProduct) {
        try {
            return await productModel.create(newProduct)
        } catch(error) {
            return new Error(error)
        }
    }
}