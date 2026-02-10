const Project = require("../models/mongodb/Project.model")

const createProjectInDb = async (userId, title, description, deadline, teamId) => {

    const newProject = new Project({
        title,
        description,
        deadline,
        teams: [teamId]
    })

    await newProject.save()
    return newProject
}

const getProjectByIdFromDb = async (projectId) => {
    const project = await Project.findById(projectId)
    return project
}

const updateProjectInDb = async (projectId, title, description, deadline, teamsIds) => {
    await Project.findByIdAndUpdate(projectId, {
        title,
        description,
        deadline,
        teams: teamsIds
    })
}

module.exports = {
    createProjectInDb,
    getProjectByIdFromDb,
    updateProjectInDb
}