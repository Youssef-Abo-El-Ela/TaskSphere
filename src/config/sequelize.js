const { Sequelize } = require("sequelize")
const winstonLogger = require("../utils/winstonLogger")
require("dotenv").config()

const sequelize = new Sequelize(process.env.POSTGRES_URI)

const testPGConnection = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connection to PostgreSQL has been established successfully.')
        return
    } catch (error) {
        winstonLogger.error(error)
    }
}

module.exports = {
    sequelize,
    testPGConnection
}