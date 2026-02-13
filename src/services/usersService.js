const { getProjectByIdFromDb } = require("../repositories/projects")
const { createUserInDb, checkIfUserIsTeamLeaderInDb, getAllUsersFromDb, updateUserInDb, softDeleteUserFromDb, getUserByIdFromDb } = require("../repositories/users")

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

const getAllUsersService = async () => {
    const users = await getAllUsersFromDb()
    return users
}

const updateUserService = async (userId, name, isActive) => {
    const updatedUser = await updateUserInDb(userId, name, isActive)
    return updatedUser
}

const deleteUserService = async (userId) => {
    await softDeleteUserFromDb(userId)
}

module.exports = {
    createUserService,
    checkIfUserIsTeamLeader,
    checkIfUserIsProjectCreator,
    getUserByIdService,
    getAllUsersService,
    updateUserService,
    deleteUserService
}