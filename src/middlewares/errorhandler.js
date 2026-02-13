const winstonLogger = require("./winstonLogger")

const errorHandler = (err, req, res, next) => {
    const message = err.message || 'Internal Server Error'
    const statusCode = err.statusCode || 500
    const error = new Error(message)
    error.statusCode = statusCode

    winstonLogger.error(`${req.method} ${req.originalUrl} - ${error.message}\nStack: ${error.stack}`)
    res.status(statusCode).json({ message: error.message, stack: error.stack })
}

module.exports = errorHandler