const fs = require('fs')

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

    async add_Product({ title, description, price, thumbnail, code, stock }) {
        try {
            const existingProduct = this.products.find(product => product.code === code)
            stock = stock ?? 0
            let data = { title, description, price, thumbnail, code, stock }
            if (existingProduct) {
                throw new Error(`El producto con el código ${code} ya existe`)
            }

            this.products.length === 0 ? data.id = 1 : data.id = this.products[this.products.length-1].id + 1
            this.products.push(data)
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            return data.id
        } catch(err) {
            return 'addProduct: error', err
        }
    }

    async getProducts() {
        try {
            //let products = JSON.parse(fs.readFileSync(this.path, 'UTF-8'))
            if (this.products.length === 0) {
                return 'Not Found'
            }
            return this.products
        } catch(err) {
            return 'getProducts: error', err
        }
    }

    getProductById(id) {
        let product = this.products.find(product => product.id === id)
        if(!product) {
            return 'getProductById: error'
        }
        return product
    }

    async updateProduct(id, data) {
        try {
            let product = this.getProductById(id)
            //Verificacion de datos y errores
            if(!product) {
                return 'updateProduct: error user not found'
            }

            if(Object.keys(data).length === 0) {
                return 'updateProduct: error insert some values'
            }

            for (let prop in data) {
                /*if(prop != 'title' || prop != 'description' || prop != 'price' || prop != 'thumbnail' || prop != 'code' || prop != 'stock') {
                    console.log(`updateProduct: error ${prop} is not a property of product`)
                }*/

                product[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            return 'updateProduct: done'
        } catch(err) {
            return 'updateProduct: error', err
        }
    }

    async deleteProduct(id) {
        try {
            this.products = this.products.filter(each => each.id !== id)
            console.log(this.products)
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            return 'deleteProduct: done'
        } catch(err) {
            return 'deleteProduct: error', err
        }
    }
}

module.exports = ProductManager