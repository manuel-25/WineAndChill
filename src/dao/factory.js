import config from '../config/config.js'
//MONGO
import ProductManagerDao from './Mongo/ProductManager.js'
import CartManagerDao from './Mongo/CartManager.js'
import UserManagerDao from './Mongo/UserManager.js'

let UserDao 
let ProductDao
let CartDao

switch (config.PERSISTENCE) {
    case MONGO:
        ProductDao = ProductManagerDao,
        CartDao = CartManagerDao,
        UserDao = UserManagerDao
        break;
    case MEMORY:
        
        break;
    case FILE:
        
        break;

    default:
        break;
}

export {
    UserDao,
    ProductDao,
    CartDao
}