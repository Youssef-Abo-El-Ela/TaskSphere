const { mongoose } = require('../../config/mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    deadline: {
        type: Date,
        required: true
    },
    tasks: [
        { id: String },
    ],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema)

module.exports = Project