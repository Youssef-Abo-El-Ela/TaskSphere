const express = require('express')
const { requestLogger, errorLogger } = require('./utils/morganLogger')
const { connectMongoDb } = require('./config/mongoose')
const userProjectsRouter = require('./routes/userProjectsRoutes')
const usersRouter = require('./routes/userRoutes')
const userTeamsRouter = require('./routes/userTeamsRoutes')
const { testPGConnection } = require('./config/sequelize')
const { tasksRouter } = require('./routes/userTasksRoutes')
const { isValidUser } = require('./middlewares/isValidUser')
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


module.exports = {
    app,
    express
}