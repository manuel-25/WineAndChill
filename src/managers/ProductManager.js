import fs from 'fs'

class ProductManager {
    constructor (path) {
        this.products = []
        this.path = path
        this.init(path)
    }

    init(path) {
        try {
            let file = fs.existsSync(path)
            if (!file) {
                fs.writeFileSync(path, '[]')
                return 'File created at path: ' + this.path
            } else {
                this.products = JSON.parse(fs.readFileSync(path, 'UTF-8'))
                return 'Data recovered'
            }
        } catch(err) {
            console.error('init:', err)
            return 'init: error'
        }
    }

    async writeFile(data_json) {
        await fs.promises.writeFile(this.path, data_json)
    }

    async add_Product({ title, description, price, thumbnail, code, stock }) {
        try {
            const existingProduct = this.products.find(product => product.code === code)
            stock = stock ?? 0
            let data = { title, description, price, thumbnail, code, stock }
            if (existingProduct) {
                return {
                    error: `El producto con el código ${code} ya existe`
                }
            }
    
            this.products.length === 0 ? data.id = 1 : data.id = this.products[this.products.length-1].id + 1
            this.products.push(data)
            let data_json = JSON.stringify(this.products, null, 2)
            this.writeFile(data_json)
            return data
        } catch(err) {
            console.log(err)
            return 'addProduct: error', err
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            if (this.products.length === 0) {
                return {
                    error: 'Products not found'
                }
            }
            return this.products
        } catch (error) {
            console.error(`getProducts: error: ${error}`)
        }
      }


      async getProductById(id) {
        try {
          const products = await this.getProducts()
          const product = products.find(product => product.id == id) // con === no funciona 
          if (!product) {
            return {
              error: 'Product not found'
            }
          }
          return {
            product
          }
        } catch (error) {
          console.error(`getProductById: error: ${error}`)
        }
      }


    async updateProduct(id, data) {
        try {
            //Verificacion de datos y errores
            let productIndex = this.products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                return {
                    error: 'updateProduct error: product not found'
                }
            }

            if(Object.keys(data).length === 0) {
                return {
                    error: 'updateProduct error: insert some values'
                }
            }

            let product = this.products[productIndex];
            for (let prop in data) {
                product[prop] = data[prop];
            }
            let data_json = JSON.stringify(this.products, null, 2)
            this.writeFile(data_json)
            return product
        } catch(err) {
            console.log('updateProduct: '+err)
        }
    }

    async deleteProduct(id) {
        try {
          const result = await this.getProductById(id)
          if (!result.product) {
            return {
              error: 'Product not found'
            }
          }
          this.products = this.products.filter(each => each.id !== id)
          let data_json = JSON.stringify(this.products, null, 2)
          this.writeFile(data_json)
          return result.product
        } catch(error) {
          console.log('deleteProduct: error', err)
          return {
            error: 'deleteProduct: error', error
          }
        }
      }
}

let producto = new ProductManager("./data/data.json") //corriendo con node .\productManager.js se necesita la ruta  "../data/data.json"

export default producto