import ChatModel from "./models/chat.model.js";


class ChatManagerDao {
    constructor() {
        this.ChatModel = ChatModel
    }

    async getAll() {
        return await ChatModel.find({})
    }

    async getById(cid) {
        return await ChatModel.findById(cid)
    }

    async create(data) {
        return await ChatModel.create(data)
    }
}

export default ChatManagerDao