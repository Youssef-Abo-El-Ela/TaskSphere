const { mongoose } = require('../../config/mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User