import fetch from "node-fetch"
import axios from "axios"

class ViewController {
  async renderCart(req, res, next) {
    try {
      const token = req.cookies.token
      const response = await fetch(`http://localhost:8080/api/carts/bills`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      //console.log(data.payload.products)
      return res.render("cart/cart", {
        title: "Cart",
        style: "cart.css",
        script: "cartScript.js",
        response: data
      })
    } catch (error) {
      next(error)
    }
  }

  renderRegister(req, res, next) {
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

  async renderProductList(req, res, next) {
    try {
      const appUrl = `${req.protocol}://${req.headers.host}`
      const limit = parseInt(req.query.limit) || 5
      const page = parseInt(req.query.page) || 1
      const title = req.query.title || ''
  
      const apiUrl = `${appUrl}/api/products?limit=${limit}&page=${page}&title=${title}`
  
      const response = await axios.get(apiUrl)
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
      }
    } catch (error) {
      next(error)
    }
  }

  async renderProductDetail(req, res, next) {
    try {
      const appUrl = `${req.protocol}://${req.headers.host}`
    
      const response = await axios.get(`${appUrl}/api/products/${req.params.pid}`)
      if (response.status === 200) {
        const product = response.data.response
        
        return res.render('products/productDetail', {
          title: 'Product Detail',
          product,
          style: 'productDetail.css',
          script: 'productDetail.js'
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

  renderLogin(req, res, next) {
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

  renderIndex(req, res, next) {
    try {
      return res.render('index', {
        title: 'Home',
        style: 'index.css'
      })
    } catch (error) {
      next(error)
    }
  }

  renderCreateProduct(req, res, next) {
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

  renderChat(req, res, next) {
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

  renderForgotPassword(req, res, next) {
    try {
      res.render('auth/forgotPassword', {
        title: 'Forgot Password',
        style: 'forgotPassword.css',
        script: 'forgotPassword.js'
      })
    } catch (err) {
      next (err)
    }
  }

  renderResetPassword(req, res, next) {
    try {
      res.render('auth/resetPassword', {
        title: 'Reset Password',
        style: 'resetPassword.css',
        script: 'resetPassword.js',
        email: req.resetToken
      })
    } catch (err) {
      next (err)
    }
  }

  renderError(req, res, next) {
    try {
      res.render('error', {
        title: 'Error',
        style: 'error.css',
        script: '',
        error
      })
    } catch (err) {
      next (err)
    }
  }
}


export default new ViewController()