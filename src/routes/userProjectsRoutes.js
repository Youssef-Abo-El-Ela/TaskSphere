const express = require('express')
const { getAllUserProjects, createProject, getProjectById, updateProject, deleteProject } = require('../controllers/projectsController')
const userProjectsRouter = express.Router()

userProjectsRouter.get('/', getAllUserProjects)
// userProjectsRouter.post('/', createProject)
// userProjectsRouter.get('/:id', getProjectById)
// userProjectsRouter.patch('/:id', updateProject)
// userProjectsRouter.delete('/:id', deleteProject)


module.exports = userProjectsRouter
