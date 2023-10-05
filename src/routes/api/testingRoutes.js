import Router from 'express'
import { generateProductArray } from '../../utils/mocks/generateUserFaker.js'
import { generateUsers, generateProducts } from '../../utils/mocks/generateUserFaker.js'
import { hashSync, genSaltSync } from "bcrypt"
import { userService, productService } from '../../Service/index.js'
import { logger } from '../../config/logger.js'

const router = Router()

router.get('/mockingproducts', (req, res) => {
    const products = generateProductArray(100)
    return res.send(products)
})

router.get('/logger', (req, res) => {
    req.logger.warning(`Warning - ${new Date().toLocaleString()}`)
    req.logger.error(`404 - ${new Date().toLocaleString()}`)
    res.send('Logger registered')
})

//creates fake user and stores in mongo
router.get('/testuser', async (req, res) => {
    try {
        for(let i = 0; i < 50; i++) {
            let persona = generateUsers()
            persona.confirmPassowrd = persona.password
            persona.password = hashSync(persona.password, genSaltSync(10)) 
            userService.create(persona)
            logger.info('Usuario de prueba creado')
        }
        res.status(200).send({
            status: 'success',
            payload: 'Usuarios creados con exito'
        })
    } catch (err) {
        res.status(500).send({
            status: 'error',
            payload: err
        })
    }
})

router.get('/testproduct', async (req, res) => {
    try {
        for(let i = 0; i < 50; i++) {
            let productMock = generateProducts(20)
            let result = await productService.create(productMock)
            logger.info('Producto de prueba creado')
        }
        res.status(200).send({
            status: 'success',
            payload: 'Productos creados con exito'
        })
    } catch (err) {
        res.status(500).send({
            status: 'error',
            payload: err
        })
    }
})

router.get('/simpleCounter', (req, res) => {
    let suma = 0 
    for (let i = 0; i < 1000000; i++) {
        suma += i
    }
    res.send('Operacion simple: ' + suma)
})
//artillery quick --count 40 --num 50 'http://localhost:8080/api/test/simpleCounter' -o simple.json

router.get('/complexCounter', (req, res) => {
    let suma = 0 
    for (let i = 0; i < 5e8; i++) {
        suma += i
    }
    res.send('Operacion compleja: ' + suma)
})
//artillery quick --count 40 --num 50 'http://localhost:8080/api/test/complexCounter' -o complex.json

// User login tests
//artillery run config.yaml --output testPerformance.json
//artillery report testPerformance.json -o testResults.html


//SMS and Mailing
router.get('/confirm/email', async (req, res) => {
    await sendEmail()
    res.send('email enviado')
})

router.get('/confirm/sms', async (req, res) => {
    await sendWhatsapp()
    res.send('email enviado')
})

export default router