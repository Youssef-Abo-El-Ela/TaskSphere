const { getAllUserProjectsService, createProjectService, getProjectByIdService, updateProjectService } = require("../services/projectsService")
const { checkIfUserIsTeamLeader } = require("../services/usersService")

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
    const isLeader = await checkIfUserIsTeamLeader(req.params.userId, req.body.teamsIds)
    if(!isLeader) {
        return res.status(403).json({ message: 'Only team leaders can update projects' })
    }
    const { title, description, deadline, teamsIds } = req.body

    await updateProjectService(req.params.projectId, title, description, deadline, teamsIds)

    res.status(200).json({ message: 'Project updated successfully' })

}

module.exports = {
    getAllUserProjects,
    createProject,
    getProjectById,
    updateProject
}