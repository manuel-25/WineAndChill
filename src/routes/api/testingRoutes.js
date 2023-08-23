import Router from 'express'
import { generateProductArray } from '../../utils/mocks/generateUserFaker.js'
import { generateUsers } from '../../utils/mocks/generateUserFaker.js'
import { hashSync, genSaltSync } from "bcrypt"
import { userService } from '../../Service/index.js'

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
router.get('/testuser', (req, res) => {
    let persona = generateUsers()
    persona.password = hashSync(persona.password, genSaltSync(10)) 
    userService.create(persona)
    res.send(persona)
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