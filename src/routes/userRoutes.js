const express = require('express')
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController')
const userRouter = express.Router()


userRouter.post('/' , createUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUserById)
userRouter.patch('/:userId', updateUser)
userRouter.delete('/:userId', deleteUser)

module.exports = userRouter