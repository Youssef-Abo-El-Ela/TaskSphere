const { createTeamInDb } = require("../repositories/teams")
const { checkUserExists } = require("../repositories/users")

const createTeamService = async (userId, teamName) => {
    const isValidUser = await checkUserExists(userId)
    if (!isValidUser) {
        throw new Error('User not found or invalid user ID')
    }
    const createdTeam = await createTeamInDb(userId, teamName)
    return createdTeam
}

module.exports = {
    createTeamService
}