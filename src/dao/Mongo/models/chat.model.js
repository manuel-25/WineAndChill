import { model, Schema } from 'mongoose'

const collection = 'chats'
const schema = new Schema({
    username: { type:String, required: true},
    message: { type:String, required: true},
    currentTime: { type:String, required: true},
    socketId: { type:String, required: true},
    color: { type:String, required: true}
})

const ChatModel = model(collection, schema)

export default ChatModel