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

module.exports = {
    createUserService,
    checkIfUserIsTeamLeader
}