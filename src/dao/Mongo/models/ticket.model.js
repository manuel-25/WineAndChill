import { model, Schema } from 'mongoose'

const collection = 'tickets'

const ticketSchema = new Schema({
    code: { type: String, required: true},
    purchase_datetime: {type: String, required: true},
    amount: { type: Number, required: true},
    purchaser: { type: String, required: true, index: true}
})

const TicketModel = model(collection, ticketSchema)
export default TicketModel