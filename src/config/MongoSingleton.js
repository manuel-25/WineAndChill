import mongoose from "mongoose";
import config from "./config.js";

class MongoSingleton {
    static #instance
    constructor() {
        mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    static getInstance() {
        if(this.#instance) {
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        return this.#instance
    }
}

export default MongoSingleton