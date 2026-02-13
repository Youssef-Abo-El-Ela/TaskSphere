const express = require('express')
const { getAnalytics, getProjectTaskData, exportAnalytics, exportProjectTaskData } = require('../controllers/analyticsController')
const analyticsRouter = express.Router({ mergeParams: true })

analyticsRouter.get('/', getAnalytics)
analyticsRouter.get('/:projectId/task-data', getProjectTaskData)
analyticsRouter.get('/export', exportAnalytics)
analyticsRouter.get('/export-project-tasks-data/:projectId', exportProjectTaskData)

module.exports = analyticsRouter