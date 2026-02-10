const { createProjectInDb, getProjectByIdFromDb, updateProjectInDb, deleteProjectFromDb } = require("../repositories/projects")
const { linkProjectToTeam } = require("../repositories/teams")
const { getAllUserProjectsFromDb } = require("../repositories/users")

const getAllUserProjectsService = async (userId) => {
    const userProjects = await getAllUserProjectsFromDb(userId)

    return userProjects
}

const createProjectService = async (userId, title, description, deadline, teamId) => {
    if(deadline < new Date()) {
        throw new Error('Deadline cannot be in the past')
    }
    const newProject = await createProjectInDb(userId, title, description, deadline, teamId)
    await linkProjectToTeam(newProject._id, teamId)
    return newProject
}

const getProjectByIdService = async (projectId) => {
    const project = await getProjectByIdFromDb(projectId)
    return project
}

const updateProjectService = async (projectId, title, description, deadline, teamsIds) => {
    if(deadline < new Date()) {
        throw new Error('Deadline cannot be in the past')
    }
    await updateProjectInDb(projectId, title, description, deadline, teamsIds)
}

const deleteProjectService = async (projectId) => {
    await deleteProjectFromDb(projectId)

}

module.exports = {
    getAllUserProjectsService,
    createProjectService,
    getProjectByIdService,
    updateProjectService,
    deleteProjectService
}