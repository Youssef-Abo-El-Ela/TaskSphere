const { getProjectByIdFromDb } = require("../repositories/projects")
const { createUserInDb, checkIfUserIsTeamLeaderInDb } = require("../repositories/users")

const createUserService = async (name) => {
    if (!name) {
        throw new Error('Name is required to create a user')
    }
    return await createUserInDb(name)
}

const checkIfUserIsTeamLeader = async (userId, teamIds) => {
        const isLeader = await checkIfUserIsTeamLeaderInDb(userId, teamIds)
        if (isLeader) {
            return true
        }
    return false
}

const checkIfUserIsProjectCreator = async (userId, projectId) => {
    const project = await getProjectByIdFromDb(projectId)
    if (project && project.createdBy.toString() === userId) {
        return true
    }
    return false
}

const getUserByIdService = async (userId) => {
    const user = await getUserByIdFromDb(userId)
    return user
}

module.exports = {
    createUserService,
    checkIfUserIsTeamLeader,
    checkIfUserIsProjectCreator,
    getUserByIdService
}