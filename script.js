const ProductManager = require('./main.js')

let producto = new ProductManager("./data/data.json")
producto.add_Product({ title: 'producto 1', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc123'})
producto.add_Product({ title: 'producto 2', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc124'})
producto.add_Product({ title: 'producto 3', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc125'})
producto.add_Product({ title: 'producto 4', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc126'})
producto.add_Product({ title: 'producto 5', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc127'})
producto.add_Product({ title: 'producto 6', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc128'})
producto.add_Product({ title: 'producto 7', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc129'})
producto.add_Product({ title: 'producto 8', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc130'})
producto.add_Product({ title: 'producto 9', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc131'})
producto.add_Product({ title: 'producto 10', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc132'})

producto.getProductById(9)

producto.updateProduct(9, { title: 'producto 11', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc131'})

producto.deleteProduct(10)

console.log(producto.getProducts())