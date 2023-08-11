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
        cellar: faker.helpers.arrayElement(['Cabernet Sauvignon', 'Merlot', 'Malbec', 'Chardonnay', 'Sauvignon Blanc', 'Syrah']),
        type: faker.helpers.arrayElement(['Cabernet Sauvignon', 'Merlot', 'Malbec', 'Chardonnay', 'Sauvignon Blanc', 'Syrah']),
        //_id: faker.database.mongodObjectId()
    };
}

const generateUsers = () => {
    let numOfProducts = parseInt(faker.string.numeric(1, {bannedDigits: ['0']}))
    let products = []
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProducts())
    }
    return {
        name: faker.internet.userName(),
        photo: faker.image.avatar(),
        email: faker.internet.email(),
        age: faker.random.number({ min: 18, max: 99 }),
        cartId: faker.database.mongodObjectId(),
        _id: faker.database.mongodObjectId()
    }
}


export {
    generateProductArray
}