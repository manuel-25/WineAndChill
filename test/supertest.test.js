import chai from 'chai'
import supertest from 'supertest'
import { generateUsers, generateProducts } from '../src/utils/mocks/generateUserFaker.js'
import config from '../src/config/config.js'
import jwt from 'jsonwebtoken'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Supertest WineAndChill', () => {
    describe('Sessions test', () => {
        let mockUser = generateUsers()
        let cookie
        it('Endpoint POST /api/auth/register debe registar un usuario', async () => {
            mockUser.confirmPassword = mockUser.password
            const { ok, statusCode, body } = await requester.post('/api/auth/register').send(mockUser)
            expect(body.payload).to.have.property('_id')
            expect(body).to.have.property('success', true)
            expect(statusCode).to.equal(200)
            expect(ok).to.be.ok
        })

        it('Endpoint POST /api/auth/signin debe logear a un usuario', async () => {
            const response = await requester.post('/api/auth/signin').send(mockUser)
            const cookieResult = response.header['set-cookie'][0]
            expect(cookieResult).to.be.ok
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }
            expect(cookie.name).to.be.ok.and.eql('token')
            expect(cookie.value).to.be.ok
        })

        it('Endpoint GET /api/auth/signout debe cerrar la session', async () => {
            const { ok, status, headers } = await requester.get('/api/auth/signout')
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
            expect(ok).to.be.ok
            expect(status).to.eql(200)
            expect(resetToken).to.be.ok
        })

        it('Endpoint POST /api/auth/reset-password resetear la password.', async function() {
            this.timeout(3000)
            let sendBody = {
                userEmail: mockUser.email,
                password: 'abcd1234',
                confirmPassword: 'abcd1234'
            }
            const response = await requester.post('/api/auth/reset-password').send(sendBody)
            const { ok, status, body } = response            
            expect(ok).to.be.ok
            expect(status).to.eql(200)
            expect(body).to.deep.equal({
                success: true,
                message: 'Password changed!'
            })
        })

        it('Endpoint GET /api/auth/current devuelve true si el usuario esta logeado', async () => {
            const { ok, status, _body } = await requester.get('/api/auth/current')
                .set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(ok).to.be.ok
            expect(status).to.eql(200)
            expect(_body.payload.email).to.be.eql(mockUser.email)
        })
    })

    describe('Products Test', () => {
        let mockProduct = generateProducts()
        it('Endpoint GET /api/products/ should return products paginated', async () => {
            const { ok, status, _body } = await requester.get('/api/products/')
            expect(ok).to.be.ok
            expect(status).to.be.eql(200)
            expect(_body.response).to.have.property('docs').to.be.an('array')
            expect(_body.response).to.have.property('limit').to.be.a('number')
        })

        it('Endpoint POST /api/products/ should create a product', async () => {
            const authToken = jwt.sign({role: 'OWNER'}, config.SECRET_JWT, { expiresIn: 10000 })
            const { ok, status, _body } = await requester.post('/api/products/')
                .send(mockProduct)
                .set('Cookie', [`token=${authToken}`])
            mockProduct = _body.payload
            expect(ok).to.be.ok
            expect(status).to.be.eql(201)
            expect(_body).to.have.property('payload').that.is.an('object')
            const { payload } = _body
            //Properties
            expect(payload).to.have.property('title').that.is.a('string')
            expect(payload).to.have.property('description').that.is.a('string')
            expect(payload).to.have.property('stock').that.is.a('number')
            expect(payload).to.have.property('thumbnail').that.is.a('string')
            expect(payload).to.have.property('price').that.is.a('number')
            expect(payload).to.have.property('cellar').that.is.a('string')
            expect(payload).to.have.property('type').that.is.a('string')
            expect(payload).to.have.property('status').that.is.a('boolean')
            expect(payload).to.have.property('owner').that.is.a('string')
            expect(payload).to.have.property('_id').that.is.a('string')
        })

        it('Endpoint /api/products/:pid should return a single product', async () => {
            const { ok, status, _body } = await requester.get(`/api/products/${mockProduct._id}`)
            expect(ok).to.be.ok
            expect(status).to.be.eql(200)
            //Properties 
            const { response } = _body
            expect(response).to.have.property('title').that.is.a('string')
            expect(response).to.have.property('description').that.is.a('string')
            expect(response).to.have.property('stock').that.is.a('number')
            expect(response).to.have.property('thumbnail').that.is.a('string')
            expect(response).to.have.property('price').that.is.a('number')
            expect(response).to.have.property('cellar').that.is.a('string')
            expect(response).to.have.property('type').that.is.a('string')
            expect(response).to.have.property('status').that.is.a('boolean')
            expect(response).to.have.property('owner').that.is.a('string')
            expect(response).to.have.property('_id').that.is.a('string')
            expect(response._id).to.be.eql(mockProduct._id)
        })

        it('Endpoint PUT /api/products/:pid should update a product', async () => {
            mockProduct.title = 'UPDATED'
            mockProduct.price = 0
            mockProduct.status = false
            mockProduct.description = 'Product updated in supertest succesfully'
            mockProduct.stock = 0
            mockProduct.thumbnail = 'default'
            mockProduct.cellar = 'Bodega'
            mockProduct.type = 'default'
            const authToken = jwt.sign({ email: 'admin@admin.com', role: 'OWNER' }, config.SECRET_JWT, { expiresIn: 10000 });
            
            const { ok, status, _body }  = await requester
                .put(`/api/products/${mockProduct._id}`)
                .set('Cookie', [`token=${authToken}`])
                .send(mockProduct)
            const { payload } = _body

            expect(ok).to.be.ok
            expect(status).to.be.eql(201)
            expect(payload).to.have.property('title').that.is.equal('UPDATED')
            expect(payload).to.have.property('description').that.is.equal('Product updated in supertest succesfully')
            expect(payload).to.have.property('status').that.is.equal(false)
            expect(payload).to.have.property('price').that.is.equal(0)
            expect(payload).to.have.property('stock').that.is.equal(0)
            expect(payload).to.have.property('thumbnail').that.is.equal('default')
            expect(payload).to.have.property('cellar').that.is.equal('Bodega')
            expect(payload).to.have.property('type').that.is.equal('default')
        })

        it('Endpoint DELETE /api/products/:pid should delete a product', async () => {
            const authToken = jwt.sign({ email: 'admin@admin.com', role: 'OWNER' }, config.SECRET_JWT, { expiresIn: 10000 });

            const { ok, status, _body } = await requester.delete(`/api/products/${mockProduct._id}`)
                .set('Cookie', [`token=${authToken}`])
            expect(ok).to.be.ok
            expect(status).to.be.eql(200)
            expect(_body).to.have.property('payload').that.is.a('object')
        })
    })

    describe('Carts Test', () => {
        it('Endpoint GET /api/carts/ should return all carts', async () => {
            const { ok, status, _body } = await requester.get('/api/carts/')
            expect(ok).to.be.ok
            expect(status).to.eql(200)
            expect(_body).to.have.property('response').that.is.an('array')
        })

        it('Endpoint GET /api/carts/cartId/:cartId should return ids cart', async () => {
            const { ok, status, _body } = await requester.get(`/api/carts/cartId/:cartId`)
            expect(ok).to.be.ok
            expect(status).to.eql(200)
        })
    })
})