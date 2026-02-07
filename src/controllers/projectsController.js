const { getAllUserProjectsService, createProjectService } = require("../services/projectsService")

const getAllUserProjects = async (req, res) => {
    const userId = req.params.userId

    const userProjects = await getAllUserProjectsService(userId)

    res.status(200).json(userProjects)

}

const createProject = async (req, res) => {
    const userId = req.params.userId
    const { title, description, deadline, teamId } = req.body

    const newProject = await createProjectService(userId, title, description, deadline, teamId)

    res.status(201).json({ message: 'Project created successfully', data: newProject })
}


module.exports = {
    getAllUserProjects,
    createProject,
}