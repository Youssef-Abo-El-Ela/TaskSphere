const Project = require("../models/mongodb/Project.model")

const createProjectInDb = async (userId, title, description, deadline, teamId) => {

    const newProject = new Project({
        title,
        description,
        deadline,
        team: teamId,
    })

    await newProject.save()
    return newProject
}

module.exports = {
    createProjectInDb
}