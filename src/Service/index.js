import ProductManagerDao from "../dao/Mongo/ProductManager.js";
import CartManagerDao from "../dao/Mongo/CartManager.js";
import UserManagerDao from "../dao/Mongo/UserManager.js";
import ChatManagerDao from "../dao/Mongo/ChatManager.js";

import ProductRepository from "../repositories/product.repository.js";

const productService = new ProductRepository( new ProductManagerDao())
const cartService = new CartManagerDao()
const userService = new UserManagerDao()
const chatService = new ChatManagerDao()

export {
    productService,
    cartService,
    userService,
    chatService
}