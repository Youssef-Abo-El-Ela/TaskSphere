const express = require('express')
const { createTeamService } = require('../services/teamsService')
const { createTask, getAllAssignedTasksForProject } = require('../controllers/tasksController')

const tasksRouter = express.Router({mergeParams: true})

tasksRouter.post('/', createTask)
tasksRouter.get('/:teamId', getAllAssignedTasksForProject)

module.exports = {
    tasksRouter
}