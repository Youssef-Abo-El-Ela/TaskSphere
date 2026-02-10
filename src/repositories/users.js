const User = require('../models/mongodb/User.model')
const Project = require('../models/mongodb/Project.model')
const Team = require('../models/mongodb/Team.model')
const { mongoose } = require('../config/mongoose')

const getAllUserProjectsFromDb = async (userId) => {

    const userTeams = await Team.find({ members: userId }).populate('projects')
    const projects = userTeams.reduce((acc, team) => {
        return acc.concat(team.projects)
    }, [])

    return projects
}

const createUserInDb = async (name) => {
    const newUser = new User({ name })
    await newUser.save()
    return newUser
}

const checkUserExists = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return false

    }
    const user = await User.findById(userId)
    return user !== null
}

const checkIfUserIsTeamLeaderInDb = async (userId, teamIds) => {      
    const teams = await Team.find({ _id: { $in: teamIds }, leader: userId })    
    return teams.length > 0
}

module.exports = {
    getAllUserProjectsFromDb,
    createUserInDb,
    checkUserExists,
    checkIfUserIsTeamLeaderInDb

}