class UserRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    getAll = async () => {
      let result = await this.dao.getAll()
      return result
    }
  
    getById = async (uid) => {
      let result = await this.dao.getById(uid)
      return result
    }

    getByEmail = async (email) => {
        let result = await this.dao.getByEmail(email)
        return result
    }
  
    create = async (data) => {
      let result = await this.dao.create(data)
      return result
    }

    createData = async (name, email, age, photo, password) => {
        const userData = {
          name: name,
          email: email,
          age: age,
          photo: photo,
          password: password
        }
        let result = await this.dao.createData(userData)
        return result
    }
  
    update = async (uid, data, config) => {
      let result = await this.dao.update(uid, data, config)
      return result
    }
  
    delete = async (uid) => {
      let result = await this.dao.delete(uid)
      return result
    }

}
  
  export default UserRepository;
  