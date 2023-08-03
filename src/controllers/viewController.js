import fetch from "node-fetch"
import axios from "axios"

const cart = async(req, res, next) => {
    try {
        //return res.send('funcionaaaa')
        //const cartId = '649069e6a4baa6b6d58c6546'
        const token = req.cookies.token
        console.log('view token', token)
        const response = await fetch(`http://localhost:8080/api/carts/bills`, {
            headers: {
                'authorization': `Bearer ${token}`,
            },
        })
        //console.log('data:', response)
        const data = await response.json()
    
        if (!response.ok) {
          return res.status(response.status).json({
            status: response.status,
            response: data.message || "Error fetching cart"
          })
        }
    
        return res.send(data)
        /*return res.render("cart/cart", {
          title: "Cart",
          style: "cart.css",
          script: "cartScript.js",
          products: data
        })*/
    } catch (error) {
        next(error)
    }
}

const register = (req, res, next) => {
    try {
        return res.render('auth/register', {
            title: 'Register',
            style: 'register.css',
            script: 'register.js'
        })
    } catch(error) {
        next(error)
    }
}

const productList = async(req, res ,next) => {
    try {
        const appUrl = `${req.protocol}://${req.headers.host}`
        const limit = parseInt(req.query.limit) ?? 5
        const page = parseInt(req.query.page) ?? 1
        const title = req.query.title

        const response = await axios.get(`${appUrl}/api/products`, {
            params: { limit, page, title }
        })
        const products = response.data.response.docs
        const pagination = response.data.response
  
        if (response.status === 200) {
            return res.render('products/productList', {
                title: 'Products',
                products,
                pag: pagination,
                style: 'productList.css',
                script: 'productList.js'
            })
        } else {
            // Renderizar /products sin productos
            console.error('Error al obtener los productos:', response.data)
        }
    } catch (error) {
      next(error)
    }
}

const productDetail = async(req, res, next) => {
    try {
        const appUrl = `${req.protocol}://${req.headers.host}`
      
        const response = await axios.get(`${appUrl}/api/products/${req.params.pid}`)
        if (response.status === 200) {
          const product = response.data.response
          
          return res.render('products/productDetail', {
            title: 'Product Detail',
            product,
            style: 'productDetail.css',
            script: ''
          })
        } else {
          console.error('Error al obtener los detalles del producto:', response.data)
          // Renderizar una pagina de error o redireccionar a otra pagina
          return res.redirect('/error')
        }
      } catch (error) {
        next(error)
      }
}

const login = (req, res, next) => {
    try {
      return res.render('auth/login', {
        title: 'Login',
        style: 'login.css',
        script: 'login.js'
      })
    } catch (error) {
      next(error)
    }
}

const index = (req, res, next) => {
    try {
        return res.render('index', {
            title: 'Home',
            style: 'index.css'
        })
    } catch (error) {
      next(error)
    }
}

const createProduct = (req, res, next) => {
    try {
        return res.render('products/newProduct', {
            title: 'Create new product',
            style: 'newProduct.css',
            script: 'newProduct.js'
        })
    } catch(error) {
        next(error)
    }
}

const chat = (req, res, next) => {
    try {
        res.render('chat/chat', {
            title: 'Chat',
            style: 'chat.css',
            script: 'chatScript.js'
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    cart,
    chat,
    createProduct,
    login,
    index,
    productDetail,
    productList
}