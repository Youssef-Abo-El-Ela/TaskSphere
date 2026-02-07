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

const linkProjectToTeam = async (projectId, teamId) => {
    const team = await Team.findById(teamId)
    team.projects.push(projectId)
    await team.save()
}

module.exports = {
    createTeamInDb,
    linkProjectToTeam
}