const express = require('express')
const { getAllUserProjects, createProject, getProjectById, updateProject, deleteProject } = require('../controllers/projectsController')
const userProjectsRouter = express.Router({ mergeParams: true })
const asyncWrapper = require('../middlewares/asyncWrapper')
const { validateCreateProject, validateUpdateProject } = require('../middlewares/projectValidation')

userProjectsRouter.get('/', asyncWrapper(getAllUserProjects))
userProjectsRouter.post('/', validateCreateProject, asyncWrapper(createProject))
userProjectsRouter.get('/:projectId', asyncWrapper(getProjectById))
userProjectsRouter.patch('/:projectId', validateUpdateProject, asyncWrapper(updateProject))
userProjectsRouter.delete('/:projectId', asyncWrapper(deleteProject))


module.exports = userProjectsRouter
