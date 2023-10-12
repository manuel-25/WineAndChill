class CartRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    getAll = async () => {
      let result = await this.dao.getAll()
      return result
    }
  
    getById = async (cartId) => {
      let result = await this.dao.getById(cartId)
      return result
    }
  
    getOne = async (cartId) => {
      let result = await this.dao.getOne(cartId)
      return result
    }
  
    createEmpty = async () => {
      let result = await this.dao.createEmpty()
      return result
    }
  
    create = async (cartId, productId, quantity) => {
      let result = await this.dao.create(cartId, productId, quantity)
      return result
    }
  
    add = async (cartId, productId, quantity) => {
      let result = await this.dao.add(cartId, productId, quantity)
      return result
    }
  
    update = async (cartId, productId, quantity) => {
      let result = await this.dao.update(cartId, productId, quantity)
      return result
    }
  
    deleteProduct = async (cartId, productId) => {
      let result = await this.dao.deleteProduct(cartId, productId)
      return result
    }
  
    deleteCart = async (cartId) => {
      let result = await this.dao.deleteCart(cartId)
      return result
    }
  }
  
  export default CartRepository
  