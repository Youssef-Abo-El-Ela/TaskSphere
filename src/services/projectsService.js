const { createProjectInDb } = require("../repositories/projects")
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


module.exports = {
    getAllUserProjectsService,
    createProjectService
}