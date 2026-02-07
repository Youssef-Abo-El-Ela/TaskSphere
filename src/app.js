const express = require('express')
const { requestLogger, errorLogger } = require('./utils/morganLogger')
const { connectMongoDb } = require('./config/mongoose')
const userProjectsRouter = require('./routes/userProjectsRoutes')
const usersRouter = require('./routes/userRoutes')
require("dotenv").config()

const app = express()
app.use(errorLogger)
app.use(requestLogger)
app.use(express.json())

connectMongoDb()

app.use('/api/:userId/projects', userProjectsRouter)
app.use('/api/users', usersRouter)


module.exports = {
    app,
    express
}