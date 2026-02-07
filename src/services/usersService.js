const { createUserInDb } = require("../repositories/users")

const createUserService = async (name, role) => {
    if (!name) {
        throw new Error('Name is required to create a user')
    }
    return await createUserInDb(name, role)
}

module.exports = {
    createUserService
}