const { createTeamService, getAllTeamsForUserService, getTeamByIdService, updateTeamService, deleteTeamService } = require("../services/teamsService")
const { checkIfUserIsTeamLeader } = require("../services/usersService")

const createTeam = async (req, res) => {
    const userId = req.params.userId
    const { name } = req.body
    const createdTeam = await createTeamService(userId, name)

    res.status(201).json({ message: 'Team created successfully', data: createdTeam })
}

const getAllTeams = async (req, res) => {
    const userId = req.params.userId
    const teams = await getAllTeamsForUserService(userId)
    res.status(200).json({ message: 'Teams for current user retrieved successfully', data: teams })
}

const getTeamById = async (req, res) => {
    const teamId = req.params.teamId
    const team = await getTeamByIdService(teamId)
    if (!team) {
        return res.status(404).json({ message: 'Team not found' })
    }
    res.status(200).json({ message: 'Team retrieved successfully', data: team })
}

const updateTeam = async (req, res) => {
    const isLeader = await checkIfUserIsTeamLeader(req.params.userId, [req.params.teamId])
    if (!isLeader) {
        return res.status(403).json({ message: 'Only team leaders can update the team' })
    }
    const { name, members, leader } = req.body
    await updateTeamService(req.params.teamId, name, members, leader)
    res.status(200).json({ message: 'Team updated successfully' })
}

const deleteTeam = async (req, res) => {
    const isLeader = await checkIfUserIsTeamLeader(req.params.userId, [req.params.teamId])
    if (!isLeader) {
        return res.status(403).json({ message: 'Only team leaders can delete the team' })
    }
    await deleteTeamService(req.params.teamId)
    res.status(200).json({ message: 'Team deleted successfully' })
}
module.exports = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
}