const { getAllUserProjectsService, createProjectService, getProjectByIdService, updateProjectService, deleteProjectService } = require("../services/projectsService")
const { checkIfUserIsTeamLeader, checkIfUserIsProjectCreator } = require("../services/usersService")

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

const getProjectById = async (req, res) => {
    const projectId = req.params.projectId
    const project = await getProjectByIdService(projectId)

    if (!project) {
        return res.status(404).json({ message: 'Project not found' })
    }

    res.status(200).json(project)
}

const updateProject = async (req, res) => {
    if(!req.body.teamsIds || req.body.teamsIds.length === 0) {
        throw new Error('At least one team must be assigned to the project')
    }
    const isCreator = await checkIfUserIsProjectCreator(req.params.userId, req.params.projectId)
    const isLeader = await checkIfUserIsTeamLeader(req.params.userId, req.body.teamsIds)
    if(!isLeader && !isCreator) {
        return res.status(403).json({ message: 'Only team leaders or project creators can update projects' })
    }
    const { title, description, deadline, teamsIds } = req.body

    await updateProjectService(req.params.projectId, title, description, deadline, teamsIds)

    res.status(200).json({ message: 'Project updated successfully' })

}

const deleteProject = async (req, res) => {
    const projectId = req.params.projectId
    const isCreator = await checkIfUserIsProjectCreator(req.params.userId, projectId)
    if(!isCreator) {
        return res.status(403).json({ message: 'Only project creators can delete projects' })
    }
    await deleteProjectService(projectId)
    res.status(200).json({ message: 'Project deleted successfully' })
}

module.exports = {
    getAllUserProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject
}