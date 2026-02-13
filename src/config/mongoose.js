const mongoose = require('mongoose');
const winstonLogger = require('../middlewares/winstonLogger');

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        winstonLogger.error(error);
    }
};

module.exports = { connectMongoDb, mongoose };