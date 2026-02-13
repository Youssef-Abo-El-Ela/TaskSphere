const express = require('express')
const { requestLogger, errorLogger } = require('./middlewares/morganLogger')
const { connectMongoDb } = require('./config/mongoose')
const userProjectsRouter = require('./routes/userProjectsRoutes')
const usersRouter = require('./routes/userRoutes')
const userTeamsRouter = require('./routes/userTeamsRoutes')
const { testPGConnection } = require('./config/sequelize')
const { tasksRouter } = require('./routes/userTasksRoutes')
const { isValidUser } = require('./middlewares/isValidUser')
const analyticsRouter = require('./routes/analyticsRoutes')
const errorHandler = require('./middlewares/errorhandler')
require("dotenv").config()

const app = express()
app.use(errorLogger)
app.use(requestLogger)
app.use(express.json())

connectMongoDb()
testPGConnection()

app.use('/api/users', usersRouter)
app.use('/api/:userId/projects', isValidUser, userProjectsRouter)
app.use('/api/:userId/teams', isValidUser, userTeamsRouter)
app.use('/api/:userId/projects/:projectId/tasks', isValidUser, tasksRouter)
app.use('/api/analytics', analyticsRouter)
app.use(errorHandler)

module.exports = {
    app,
    express
}