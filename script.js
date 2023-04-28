const ProductManager = require('./main.js')


async function manager() {
    let producto = new ProductManager("./data/data.json")
    await producto.add_Product({ title: 'producto 1', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc123'})
    await producto.add_Product({ title: 'producto 2', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc124'})
    await producto.add_Product({ title: 'producto 3', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc125'})
    await producto.add_Product({ title: 'producto 4', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc126'})
    await producto.add_Product({ title: 'producto 5', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc127'})
    await producto.add_Product({ title: 'producto 6', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc128'})
    await producto.add_Product({ title: 'producto 7', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc129'})
    await producto.add_Product({ title: 'producto 8', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc130'})
    await producto.add_Product({ title: 'producto 9', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc131'})
    await producto.add_Product({ title: 'producto 10', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc132'})
    
    //await producto.getProductById(9)
    await producto.updateProduct(9, { title: 'producto 11', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code: 'abc131'})
    //await producto.deleteProduct(10)
    
    //console.log(await producto.getProducts())
}

manager()