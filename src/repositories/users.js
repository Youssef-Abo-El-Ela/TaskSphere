const User = require('../models/mongodb/User.model')
const Project = require('../models/mongodb/Project.model')
const Team = require('../models/mongodb/Team.model')

const getAllUserProjectsFromDb = async (userId) => {

    const userTeams = await Team.find({ members: userId }).populate('projects')
    const projects = userTeams.reduce((acc, team) => {
        return acc.concat(team.projects)
    }, [])

    return projects
}

const createUserInDb = async (name, role = "MEMBER") => {
    const newUser = new User({ name, role })
    await newUser.save()
    return newUser
}

module.exports = {
    getAllUserProjectsFromDb,
    createUserInDb
}