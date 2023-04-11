class ProductManager {
    constructor () {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    addProducts({ title, description, price, thumbnail, code, stock }) {
        const existingProduct = this.products.find(product => product.code === code)
        let id

        if (existingProduct) {
            console.log(`El producto con el código ${code} ya existe`)
        }

        this.products.length === 0 ? id = 1 : id = this.products[this.products-1]
        let product = { id, title, description, price, thumbnail, code, stock }
        this.products.push(product)
    }

    getProductById(id) {
        let product = this.products.find(product => product.id === id)
        return product || 'No '
    }
}

let producto = new ProductManager()
console.log(producto.getProducts())
producto.addProducts({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 })
console.log(producto.getProducts())
producto.addProducts({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 })