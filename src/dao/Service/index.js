import ProductManagerDao from "../Mongo/ProductManager.js";
import CartManagerDao from "../Mongo/CartManager.js";
import UserManagerDao from "../Mongo/UserManager.js";

const productService = new ProductManagerDao()
const cartService = new CartManagerDao()
const userService = new UserManagerDao()

export {
    productService,
    cartService,
    userService
}