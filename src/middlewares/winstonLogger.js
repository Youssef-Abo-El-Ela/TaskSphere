const winston = require('winston')
const path = require('path')

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logs', 'systemErrors.log'), level: 'error' })
    ]
})

module.exports = winstonLogger