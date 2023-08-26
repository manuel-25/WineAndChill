import TicketModel from "./models/ticket.model.js";

class TicketManagerDao {
    constructor() {
        this.TicketModel = TicketModel
    }

    async getAll() {
        return await TicketModel.find({})
    }

    async getById(ticketId) {
        return await TicketModel.findById(ticketId)
    }

    async getByCode(ticketCode) {
        return await TicketModel.findOne({ code: ticketCode })
    }

    async create(data) {
        return await TicketModel.create(data)
    }

    async delete(ticketId) {
        return await TicketModel.findByIdAndDelete(ticketId)
    }
}

export default TicketManagerDao