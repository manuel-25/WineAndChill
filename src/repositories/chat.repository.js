class ChatRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    getAll = async () => {
      let result = await this.dao.getAll()
      return result
    }
  
    getById = async (chatId) => {
      let result = await this.dao.getById(chatId)
      return result
    }
  
    create = async (data) => {
      let result = await this.dao.create(data)
      return result
    }
  }
  
  export default ChatRepository
  