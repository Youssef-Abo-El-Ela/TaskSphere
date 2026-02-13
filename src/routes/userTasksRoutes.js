const express = require('express')
const { createTask, getAllAssignedTasksForProject, updateTask, getTaskById, deleteTask } = require('../controllers/tasksController')
const asyncWrapper = require('../middlewares/asyncWrapper')

const tasksRouter = express.Router({mergeParams: true})

tasksRouter.post('/', asyncWrapper(createTask))
tasksRouter.get('/teams/:teamId', asyncWrapper(getAllAssignedTasksForProject))
tasksRouter.get('/:taskId', asyncWrapper(getTaskById))
tasksRouter.patch('/:taskId', asyncWrapper(updateTask))
tasksRouter.delete('/:taskId', asyncWrapper(deleteTask))

module.exports = {
    tasksRouter
}