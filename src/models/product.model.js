import { model,Schema } from 'mongoose'

const collection = 'products'
const schema = new Schema({
    title: { type:String, required:true },
    description: { type:String, required: true },
    stock: { type:Number, required:true },
    thumbnail: { type:String, required: false },
    price: { type:Number, required: true },
    category: {type:String, required: true},
    status: {type: Boolean, required: false}
})

let Product = model(collection,schema)
export default Product