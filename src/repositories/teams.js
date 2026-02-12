const Project = require('../models/mongodb/Project.model')
const Team = require('../models/mongodb/Team.model')

const createTeamInDb = async (userId, teamName) => {
    const newTeam = new Team({
        name: teamName,
        members: [],
        leader: userId
    })
    await newTeam.save()
    return newTeam
}

const linkProjectToTeam = async (projectId, teamId) => {
    const team = await Team.findById(teamId)
    if (team.projects.includes(projectId)) { return }
    else {
        team.projects.push(projectId)
        await team.save()
    }
}

const getAllTeamsForUserFromDb = async (userId) => {
    const teams = await Team.find({ $or: [{ members: userId }, { leader: userId }] }, { createdAt: 0, updatedAt: 0 })
        .populate('leader', 'name').populate('projects', 'title').populate('members', 'name')
    return teams
}

const getTeamByIdFromDb = async (teamId) => {
    const team = await Team.findById(teamId, { createdAt: 0, updatedAt: 0 }).populate('leader', 'name').populate('projects', 'title').populate('members', 'name')
    return team
}

const updateTeamInDb = async (teamId, name, members, leader) => {
    const team = await getTeamByIdFromDb(teamId)
    if (!team) {
        throw new Error('Team not found')
    }
    const updates = {}
    if (name !== undefined) updates.name = name
    if (members !== undefined) updates.members = members
    if (leader !== undefined) updates.leader = leader

    await Team.updateOne({ _id: teamId }, updates, { new: true })
}

const deleteTeamInDb = async (teamId) => {
    await Team.deleteOne({ _id: teamId })
}

const unlinkTeamFromProjects = async (teamId) => {
    await Project.updateMany({ teams: teamId }, { $pull: { teams: teamId } })
}

module.exports = {
    createTeamInDb,
    linkProjectToTeam,
    getAllTeamsForUserFromDb,
    getTeamByIdFromDb,
    updateTeamInDb,
    deleteTeamInDb,
    unlinkTeamFromProjects
}