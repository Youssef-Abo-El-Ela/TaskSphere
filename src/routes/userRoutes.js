const express = require('express')
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController')
const asyncWrapper = require('../middlewares/asyncWrapper')
const userRouter = express.Router()


userRouter.post('/' , asyncWrapper(createUser))
userRouter.get('/', asyncWrapper(getAllUsers))
userRouter.get('/:userId', asyncWrapper(getUserById))
userRouter.patch('/:userId', asyncWrapper(updateUser))
userRouter.delete('/:userId', asyncWrapper(deleteUser))

module.exports = userRouter