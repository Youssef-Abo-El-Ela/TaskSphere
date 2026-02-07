const { mongoose } = require('../../config/mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['LEADER', 'MEMBER'],
        default: 'MEMBER'
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User