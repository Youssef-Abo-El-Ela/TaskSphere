const express = require('express')
const { createTask, getAllAssignedTasksForProject, updateTask, getTaskById } = require('../controllers/tasksController')

const tasksRouter = express.Router({mergeParams: true})

tasksRouter.post('/', createTask)
tasksRouter.get('/teams/:teamId', getAllAssignedTasksForProject)
tasksRouter.get('/:taskId', getTaskById)
tasksRouter.patch('/:taskId', updateTask)

module.exports = {
    tasksRouter
}