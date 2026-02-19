const express = require('express')
const { createTask, getAllAssignedTasksForProject, updateTask, getTaskById, deleteTask } = require('../controllers/tasksController')
const asyncWrapper = require('../middlewares/asyncWrapper')
const { validateCreateTask, validateUpdateTask } = require('../middlewares/taskValidation')

const tasksRouter = express.Router({ mergeParams: true })

tasksRouter.post('/', validateCreateTask, asyncWrapper(createTask))
tasksRouter.get('/teams/:teamId', asyncWrapper(getAllAssignedTasksForProject))
tasksRouter.get('/:taskId', asyncWrapper(getTaskById))
tasksRouter.patch('/:taskId', validateUpdateTask, asyncWrapper(updateTask))
tasksRouter.delete('/:taskId', asyncWrapper(deleteTask))

module.exports = {
    tasksRouter
}