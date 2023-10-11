import {connect} from "mongoose";
import UserManagerDao from "../src/dao/Mongo/UserManager.js";
import Assert from 'assert'
import config from "../src/config/config.js";
import { generateUsers } from '../src/utils/mocks/generateUserFaker.js'

connect(config.MONGO_URL)

const assert = Assert.strict

describe('Testing User Dao', () => {
    before(function() {
        this.userDao = new UserManagerDao()
    })
    beforeEach( function () {
        this.timeout(2000)
    })
    it('El Dao debe leer todos los usuarios', async function() {
        const result = await this.userDao.getUsers()
        assert.strictEqual(Array.isArray(result), true)
    })
    it('El Dao debe crear un usuario', async function() {
        let mockUser = generateUsers()
        const result = await this.userDao.create(mockUser)
        assert.ok(result._id)
    })
    it('El Dao debe traer un usuario por Id', async function() {
        let mockUser = generateUsers()

        const result = await this.userDao.getById(mockUser._id)
        assert.strictEqual(typeof result, 'object')
    })
})