class TicketRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    getAll = async () => {
      let result = await this.dao.getAll()
      return result
    }
  
    getById = async (ticketId) => {
      let result = await this.dao.getById(ticketId)
      return result
    }
  
    getByCode = async (ticketCode) => {
      let result = await this.dao.getByCode(ticketCode)
      return result
    }
  
    create = async (data) => {
      let result = await this.dao.create(data)
      return result
    }
  
    delete = async (ticketId) => {
      let result = await this.dao.delete(ticketId)
      return result
    }
  }
  
  export default TicketRepository