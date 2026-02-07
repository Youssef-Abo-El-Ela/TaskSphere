const express = require('express')
const { requestLogger, errorLogger } = require('./utils/morganLogger')
const { connectMongoDb } = require('./config/mongoose')
require("dotenv").config()

const app = express()
app.use(errorLogger)
app.use(requestLogger)
app.use(express.json())

connectMongoDb()



module.exports = {
    app,
    express
}