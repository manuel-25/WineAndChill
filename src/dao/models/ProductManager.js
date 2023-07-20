import productModel from '../../models/product.model.js'

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

    async findById(pid) {
        try {
            return await productModel.findById(pid)
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

    async findByIdAndDelete(pid) {
        try {
            return await productModel.findByIdAndDelete(pid)
        } catch (error) {
            return new Error(error)
        }
    }
}

const ProductManager = new ProductManagerDao()

export default ProductManager