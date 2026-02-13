const express = require('express')
const { getAnalytics, getProjectTaskData } = require('../controllers/analyticsController')
const analyticsRouter = express.Router({ mergeParams: true })

analyticsRouter.get('/', getAnalytics)
analyticsRouter.get('/:projectId/task-data', getProjectTaskData)

module.exports = analyticsRouter