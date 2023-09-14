import chai from 'chai'
import supertest from 'supertest'
import { generateUsers } from '../src/utils/mocks/generateUserFaker.js'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Supertest WineAndChill', () => {
    describe('Test de Usuarios', () => {
        let mockUser = generateUsers()
        it('Endpoint POST /api/auth/register debe registar un usuario', async () => {
            //let mockUser = generateUsers()
            mockUser.confirmPassword = mockUser.password
            const { ok, statusCode, body } = await requester.post('/api/auth/register').send(mockUser)
            //console.log('Console', ok, body, statusCode)
            expect(body.payload).to.have.property('_id')
            expect(body).to.have.property('success', true)
            expect(statusCode).to.equal(200)
            expect(ok).to.equal(true)
        })
        it('Endpoint POST /api/auth/signin debe logear a un usuario', async () => {
            const { ok, statusCode, _body } = await requester.post('/api/auth/signin').send(mockUser)
            console.log('Console', ok, _body, statusCode)
        })
    })
})