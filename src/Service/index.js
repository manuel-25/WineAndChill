import ProductManagerDao from "../dao/Mongo/ProductManager.js";
import CartManagerDao from "../dao/Mongo/CartManager.js";
import UserManagerDao from "../dao/Mongo/UserManager.js";

const productService = new ProductManagerDao()
const cartService = new CartManagerDao()
const userService = new UserManagerDao()

export {
    productService,
    cartService,
    userService
}