const { mongoose } = require('../../config/mongoose')


const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
}, { timestamps: true })

const Team = mongoose.model('Team', teamSchema)

module.exports = Team

