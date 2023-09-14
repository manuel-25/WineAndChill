import chai from 'chai'
import {connect} from "mongoose";
import UserManagerDao from "../src/dao/Mongo/UserManager.js";
import config from "../src/config/config.js";
import { generateUsers } from '../src/utils/mocks/generateUserFaker.js'

const expect = chai.expect

connect(config.MONGO_URL)

describe('Testing User Dao (chai)', () => {
    before(function() {
        this.userDao = new UserManagerDao()
    })
    beforeEach( function () {
        this.timeout(2000)
    })
    it('El Dao debe leer todos los usuarios en formato array', async function() {
        const result = await this.userDao.getUsers()
        expect(Array.isArray(result)).to.be.ok //Es true
    })
    it('El Dao debe crear un usuario', async function() {
        let mockUser = generateUsers()
        const result = await this.userDao.create(mockUser)
        expect(result._id).deep.to.be.ok
    })
    it('El Dao debe traer un usuario por Id', async function() {
        let mockUser = generateUsers()

        const result = await this.userDao.getById(mockUser._id)
        expect(typeof result, 'object').equal
    })
})