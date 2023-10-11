import fetch from "node-fetch"
import axios from "axios"
import { productService, userService } from "../Service/index.js"
import { logger } from "../config/logger.js"

class ViewController {
  async renderCart(req, res, next) {
    try {
      let data = null
      const token = req.cookies.token ?? null
      if(token) {
        const response = await fetch(`http://localhost:8080/api/carts/bills`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
        })
        data = await response.json()
      }
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
      const limit = parseInt(req.query.limit) || 16
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
    
      const response = await fetch(`${appUrl}/api/products/${req.params.pid}`)
      if(!response.ok) {
        logger.error(`Error al obtener el producto: ${req.params.pid} url: ${response.url}`)
        return res.redirect(`/error?errorInfo=Error al obtener el producto ${product._id}&status=400`)
      }
      const product = await response.json()
      if(product.response.status === false) {
        logger.error(`Error al obtener producto: ${product.response._id} - status:${product.response.status} - url: ${response.url}`)
        return res.redirect(`/error?errorInfo=Error al obtener los detalles del producto ${product.response._id}&status=404`)
      }
      return res.render('products/productDetail', {
        title: 'Product Detail',
        product: product?.response,
        style: 'productDetail.css',
        script: 'productDetail.js'
      })
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

  async renderUpdateProduct(req, res, next) {
    try {
      const productId = req.params.productId
      const product = await productService.getById(productId)
      return res.render('products/updateProduct', {
        title: 'Update product',
        style: 'updateProduct.css',
        script: 'updateProduct.js',
        product
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

  async renderProfile(req, res, next) {
    try {
      const user = await userService.getByEmail(req.token.email)
      let userList = null
      if(user.role === 'OWNER') {
        userList = await userService.getAll()
      }
      const panel = req.query.panel ?? 'account-details'

      res.render('auth/profile', {
        title: 'Profile',
        style: 'profile.css',
        script: 'profile.js',
        user: user || req.token,
        userList,
        panel
      })
    } catch (err) {
      next(err)
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
      const errorInfo = req.query.errorInfo || 'Información adicional no disponible'
      const status = req.query.status || 500;

      res.render('error', {
        title: 'Error',
        style: 'error.css',
        script: '',
        error: {
          status: status || 500,
          message: errorInfo || 'Unexpected error'
        }
      })
    } catch (err) {
      next (err)
    }
  }
}


export default new ViewController()