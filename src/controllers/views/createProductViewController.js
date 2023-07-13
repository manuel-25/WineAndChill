const createProductViewController = (req, res, next) => {
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

export default createProductViewController