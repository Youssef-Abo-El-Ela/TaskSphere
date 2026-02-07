const express = require('express')
const { requestLogger, errorLogger } = require('./utils/logger')

const app = express()
app.use(express.json())

app.use(requestLogger)



app.use(errorLogger)
module.exports = app