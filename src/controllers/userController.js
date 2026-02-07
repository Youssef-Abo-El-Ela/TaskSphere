const { createUserService } = require("../services/usersService")

const createUser = async (req, res) => {

    const { name } = req.body
    const createdUser = await createUserService(name)

    res.status(201).json({ data: createdUser, message: 'User created successfully' })
}

module.exports = {
    createUser
}