const { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } = require("../services/usersService")

const createUser = async (req, res) => {

    const { name } = req.body
    const createdUser = await createUserService(name)

    res.status(201).json({ data: createdUser, message: 'User created successfully' })
}

const getAllUsers = async (req, res) => {
    const users = await getAllUsersService()
    res.status(200).json({ data: users, message: 'Users retrieved successfully' })
}

const getUserById = async (req, res) => {
    const { userId } = req.params
    const user = await getUserByIdService(userId)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ data: user, message: 'User retrieved successfully' })
}

const updateUser = async (req, res) => {
    const { userId } = req.params
    const { name , isActive } = req.body
    const updatedUser = await updateUserService(userId, name, isActive)
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ data: updatedUser, message: 'User updated successfully' })
}

const deleteUser = async (req, res) => {
    const { userId } = req.params
    await deleteUserService(userId)
    res.status(200).json({ message: 'User got inactive successfully' })
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}