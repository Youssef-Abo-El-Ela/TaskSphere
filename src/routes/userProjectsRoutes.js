const express = require('express')
const { getAllUserProjects, createProject, getProjectById, updateProject, deleteProject } = require('../controllers/projectsController')
const userProjectsRouter = express.Router({ mergeParams: true })
const asyncWrapper = require('../middlewares/asyncWrapper')

userProjectsRouter.get('/', asyncWrapper(getAllUserProjects))
userProjectsRouter.post('/', asyncWrapper(createProject))
userProjectsRouter.get('/:projectId', asyncWrapper(getProjectById))
userProjectsRouter.patch('/:projectId', asyncWrapper(updateProject))
userProjectsRouter.delete('/:projectId', asyncWrapper(deleteProject))


module.exports = userProjectsRouter
