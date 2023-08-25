class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    getProducts = async () => {
        let result = await this.dao.get()
        return result
    }
    getById = async (pid) => {
        let result = await this.dao.getById(pid)
        return result
    }
    paginate = async (query,config) => {
        let result = await this.dao.paginate(query,config)
        return result
    }
    createProduct = async (data) => {
        let result = await this.dao.create(data)
        return result
    }
    updateProduct = async (pid, data, config) => {
        let result = await this.dao.update(pid, data, config)
        return result
    }
    deleteProduct = async (pid) => {
        let result = await this.dao.delete(pid)
        return result
    }
}

export default ProductRepository