const express = require('express')
const { createTask, getAllAssignedTasksForProject, updateTask, getTaskById, deleteTask } = require('../controllers/tasksController')

const tasksRouter = express.Router({mergeParams: true})

tasksRouter.post('/', createTask)
tasksRouter.get('/teams/:teamId', getAllAssignedTasksForProject)
tasksRouter.get('/:taskId', getTaskById)
tasksRouter.patch('/:taskId', updateTask)
tasksRouter.delete('/:taskId', deleteTask)

module.exports = {
    tasksRouter
}