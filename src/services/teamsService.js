const { getAllTeamTasksFromDb } = require("../repositories/tasks")
const { createTeamInDb, getAllTeamsForUserFromDb, getTeamByIdFromDb, updateTeamInDb, unlinkTeamFromProjects, deleteTeamInDb } = require("../repositories/teams")
const { checkUserExists } = require("../repositories/users")
const { unlinkTasksFromTeam } = require("./tasksService")

const createTeamService = async (userId, teamName) => {
    const isValidUser = await checkUserExists(userId)
    if (!isValidUser) {
        throw new Error('User not found or invalid user ID')
    }
    const createdTeam = await createTeamInDb(userId, teamName)
    return createdTeam
}

const getAllTeamsForUserService = async (userId) => {
    const teams = await getAllTeamsForUserFromDb(userId)
    return teams
}

const getTeamByIdService = async (teamId) => {
    const team = await getTeamByIdFromDb(teamId)
    const teamTasks = await getAllTeamTasksFromDb(teamId)
    const formattedTeam = {
        ...team.toObject(),
        projects: team.projects.map(project => {
            return {
                name: project.title,
                tasks: teamTasks.filter(task => task.projectId.toString() === project._id.toString())
            }
        }),
    }
    return formattedTeam
}

const updateTeamService = async (teamId, name, members, leader) => {
    await updateTeamInDb(teamId, name, members, leader)
}

const deleteTeamService = async (teamId) => {
    await deleteTeamInDb(teamId)
    await unlinkTeamFromProjects(teamId)
    await unlinkTasksFromTeam(teamId)
}

module.exports = {
    createTeamService,
    getAllTeamsForUserService,
    getTeamByIdService,
    updateTeamService,
    deleteTeamService
}