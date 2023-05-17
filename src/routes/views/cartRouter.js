import { Router } from "express"
import cart from '../../managers/CartManager.js'
import producto from "../../managers/ProductManager.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const cartId = 1000
    const cartData = await cart.getCartById(cartId)
    if (!cartData || cartData.error) {
      return res.status(404).json({
        status: 404,
        response: cartData.error || "Unexpected error"
      })
    }

    let productsFromCart = await producto.getProducts()
    if (!productsFromCart || productsFromCart.error) {
        return res.status(404).json({
          status: 404,
          response: cartData.error || "Unexpected error"
        })
      }

    const productsWithQuantity = cartData.products.map((productInCart) => {
      const product = productsFromCart.find((p) => p.id === productInCart.productId)
      if (product) {
        return {
          ...product,
          quantity: productInCart.quantity
        }
      }
      return null
    })
    const validProducts = productsWithQuantity.filter((p) => p !== null)

    return res.render("cart/cart", {
      title: "Cart",
      style: "cart.css",
      script: "cartScript.js",
      products: validProducts
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 500,
      response: "Internal server error"
    })
  }
})

export default router
