const express = require('express')
const { getAnalytics, getProjectTaskData, exportAnalytics, exportProjectTaskData } = require('../controllers/analyticsController')
const analyticsRouter = express.Router({ mergeParams: true })
const asyncWrapper = require('../middlewares/asyncWrapper')

analyticsRouter.get('/', asyncWrapper(getAnalytics))
analyticsRouter.get('/:projectId/task-data', asyncWrapper(getProjectTaskData))
analyticsRouter.get('/export', asyncWrapper(exportAnalytics))
analyticsRouter.get('/export-project-tasks-data/:projectId', asyncWrapper(exportProjectTaskData))

module.exports = analyticsRouter