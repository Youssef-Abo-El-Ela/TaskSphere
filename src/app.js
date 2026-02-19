const express = require('express')
const path = require('path')
const { requestLogger, errorLogger } = require('./middlewares/morganLogger')
const { connectMongoDb } = require('./config/mongoose')
const userProjectsRouter = require('./routes/userProjectsRoutes')
const usersRouter = require('./routes/userRoutes')
const userTeamsRouter = require('./routes/userTeamsRoutes')
const { testPGConnection } = require('./config/sequelize')
const { tasksRouter } = require('./routes/userTasksRoutes')
const { isValidUser } = require('./middlewares/isValidUser')
const analyticsRouter = require('./routes/analyticsRoutes')
const { systemStatus, trackRequest } = require('./controllers/statusController')
const errorHandler = require('./middlewares/errorhandler')
require("dotenv").config()

const app = express()
app.use(trackRequest)
app.use(errorLogger)
app.use(requestLogger)
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

connectMongoDb()
testPGConnection()

app.use('/api/users', usersRouter)
app.use('/api/:userId/projects', isValidUser, userProjectsRouter)
app.use('/api/:userId/teams', isValidUser, userTeamsRouter)
app.use('/api/:userId/projects/:projectId/tasks', isValidUser, tasksRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/status', systemStatus)
app.use(errorHandler)

module.exports = {
    app,
    express
}
