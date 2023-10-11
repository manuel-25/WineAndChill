import { model,Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../../config/config.js'

const collection = 'products'
const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    stock: { type:Number, required: true },
    thumbnail: { type: String, required: false },
    price: { type: Number, required: true },
    cellar: {type: String, required: true},
    type: {type: String, enum: ['Tinto', 'Blanco', 'Rosa', 'Espumante'], default: 'Tinto'},
    status: {type: Boolean, default: true},
    owner: {type: String, default: config.ADMIN_EMAIL}
})

productSchema.plugin(mongoosePaginate)

const ProductModel = model(collection,productSchema)
export default ProductModel