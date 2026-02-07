const fs = require('fs')
const path = require('path')
const morgan = require('morgan')


// Requests logging
const requestLogStream = fs.createWriteStream(path.join(__dirname, '..', '..' ,'logs', 'requests.log'), { flags: 'a' })
const requestLogger = morgan(':method :url :status :date[web] :response-time ms', { stream: requestLogStream })

// Errors logging
const errorLogStream = fs.createWriteStream(path.join(__dirname, '..', '..', 'logs', 'errors.log'), { flags: 'a' })
const errorLogger = morgan(':method :url :status :date[web]', {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLogStream
})

module.exports = {
    requestLogger,
    errorLogger
}