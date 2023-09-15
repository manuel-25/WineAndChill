import chai from 'chai'
import supertest from 'supertest'
import { generateUsers } from '../src/utils/mocks/generateUserFaker.js'
import config from '../src/config/config.js'
import jwt from 'jsonwebtoken'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Supertest WineAndChill', () => {
    describe('Test de Sessions', () => {
        let mockUser = generateUsers()
        it('Endpoint POST /api/auth/register debe registar un usuario', async () => {
            mockUser.confirmPassword = mockUser.password
            const { ok, statusCode, body } = await requester.post('/api/auth/register').send(mockUser)
            //console.log('Console', ok, body, statusCode)
            expect(body.payload).to.have.property('_id')
            expect(body).to.have.property('success', true)
            expect(statusCode).to.equal(200)
            expect(ok).to.equal(true)
        })
        it('Endpoint POST /api/auth/signin debe logear a un usuario', async () => {
            const response = await requester.post('/api/auth/signin').send(mockUser)
            const cookieResult = response.header['set-cookie'][0]
            expect(cookieResult).to.be.ok
            let cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }
            expect(cookie.name).to.be.ok.and.eql('token')
            expect(cookie.value).to.be.ok
        })
        it('Endpoint GET /api/auth/current devuelve true si el usuario esta logeado', async () => {
            const { ok, status, body } = await requester.get('/api/auth/current')
            console.log(ok, status, body)
            expect(ok).to.be.ok
            expect(status).to.eql(200)
            //expect(body).to.deep.equal({ success: true, payload: user })
        })
        it('Endpoint GET /api/auth/signout debe cerrar la session', async () => {
            const { ok, status, headers } = await requester.get('/api/auth/signout')
            //console.log('response:', ok, status, headers)
            expect(status).to.eql(302)
            expect(headers).to.have.property('location').that.eql('/login')
        })
        it('Endpoint POST /api/auth/forgot-password debe enviar un email.', async function() {
            this.timeout(4000)
            let sendBody = {
                email: mockUser.email
            }
            const response = await requester.post('/api/auth/forgot-password').send(sendBody)
            const { ok, status, body } = response            
            const resetToken = jwt.sign({email: mockUser.email}, config.SECRET_JWT, { expiresIn: '1h' })
            //console.log('response:', ok, status, body, resetToken)
            expect(ok).to.be.ok
            expect(status).to.eql(200)
            expect(resetToken).to.be.ok
        })
        it('Endpoint POST /api/auth/forgot-password debe enviar un email.', async function() {
            this.timeout(3000)
            let sendBody = {
                userEmail: mockUser.email,
                password: 'abcd1234',
                confirmPassword: 'abcd1234'
            }
            const response = await requester.post('/api/auth/reset-password').send(sendBody)
            const { ok, status, body } = response            
            //console.log('response:', ok, status, body)
            expect(ok).to.be.ok
            expect(status).to.eql(200)
            expect(body).to.deep.equal({
                success: true,
                message: 'Password changed!'
            })
        })
    })
})