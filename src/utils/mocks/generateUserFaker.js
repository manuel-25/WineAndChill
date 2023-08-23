import { faker } from '@faker-js/faker'

const generateProductArray = (numOfProducts) => {
    let products = []
    numOfProducts ?? parseInt(faker.string.numeric(1, {bannedDigits: ['0']}))
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProducts())
    }
    return products
}

const generateProducts = () => {
    return {
        title: faker.commerce.productAdjective() + " " + faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: parseInt(faker.number.int({ min: 1, max: 100 })),
        thumbnail: faker.image.url(),
        price: parseFloat(faker.commerce.price()),
        cellar: faker.helpers.arrayElement(['Catena Zapata', 'Bodegas Salentein', 'El Enemigo Wines', 'Finca Victoria', 'Bodega Colomé', 'Bodega Diamandes']),
        type: faker.helpers.arrayElement(['Cabernet Sauvignon', 'Merlot', 'Malbec', 'Chardonnay', 'Sauvignon Blanc', 'Syrah']),
    }
}

const generateUsers = () => {
    return {
        name: faker.internet.userName(),
        photo: faker.image.avatar(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.number.int({ min: 18, max: 99 }),
    }
}


export {
    generateProductArray,
    generateUsers
}