const { createUserService } = require("../services/usersService")

const createUser = async (req, res) => {

    const { name, role } = req.body
    const createdUser = await createUserService(name, role)

    res.status(201).json({ data: createdUser, message: 'User created successfully' })
}

module.exports = {
    createUser
}