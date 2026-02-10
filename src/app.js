const express = require('express')
const { requestLogger, errorLogger } = require('./utils/morganLogger')
const { connectMongoDb } = require('./config/mongoose')
const userProjectsRouter = require('./routes/userProjectsRoutes')
const usersRouter = require('./routes/userRoutes')
const userTeamsRouter = require('./routes/userTeamsRoutes')
const { testPGConnection } = require('./config/sequelize')
const { tasksRouter } = require('./routes/userTasksRoutes')
require("dotenv").config()

const app = express()
app.use(errorLogger)
app.use(requestLogger)
app.use(express.json())

connectMongoDb()
testPGConnection()

app.use('/api/users', usersRouter)
app.use('/api/:userId/projects', userProjectsRouter)
app.use('/api/:userId/teams', userTeamsRouter)
app.use('/api/:userId/projects/:projectId/tasks', tasksRouter)


module.exports = {
    app,
    express
}