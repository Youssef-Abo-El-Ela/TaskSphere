const User = require('../models/mongodb/User.model')
const Team = require('../models/mongodb/Team.model')
const { mongoose } = require('../config/mongoose')

const getAllUserProjectsFromDb = async (userId) => {
    const userTeams = await Team.find({ $or: [{ members: userId }, { leader: userId }] }).populate({
        path: 'projects',
        populate: [
            {
                path: 'tasks'
            },
            {
                path: 'teams',
                select: 'name leader'
            }
        ]
    })
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

const getUserByIdFromDb = async (userId) => {
    const user = await User.findById(userId)
    return user
}

const getAllUsersFromDb = async () => {
    const users = await User.find()
    return users
}

const updateUserInDb = async (userId, name, isActive) => {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, isActive }, { new: true })
    return updatedUser
}

const softDeleteUserFromDb = async (userId) => {
    await User.findByIdAndUpdate(userId, { isActive: false })
}

module.exports = {
    getAllUserProjectsFromDb,
    createUserInDb,
    checkUserExists,
    checkIfUserIsTeamLeaderInDb,
    getUserByIdFromDb,
    getAllUsersFromDb,
    updateUserInDb,
    softDeleteUserFromDb

}