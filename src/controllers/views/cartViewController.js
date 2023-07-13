import fetch from "node-fetch"

const cartViewController = async(req, res, next) => {
    try {
        const cartId = '649069e6a4baa6b6d58c6546'
        const response = await fetch(`http://localhost:8080/api/carts/bills/${cartId}`)
        const data = await response.json()
    
        if (!response.ok) {
          return res.status(response.status).json({
            status: response.status,
            response: data.message || "Error fetching cart"
          })
        }
    
        return res.render("cart/cart", {
          title: "Cart",
          style: "cart.css",
          script: "cartScript.js",
          products: data
        })
    } catch (error) {
        next(error)
    }
}

export default cartViewController