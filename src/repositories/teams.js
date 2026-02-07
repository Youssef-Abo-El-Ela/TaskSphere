const Team = require('../models/mongodb/Team.model')

const createTeamInDb = async (userId, teamName) => {
    const newTeam = new Team({
        name: teamName,
        members: [userId],
        leader: userId
    })
    await newTeam.save()
    return newTeam
}

module.exports = {
    createTeamInDb
}