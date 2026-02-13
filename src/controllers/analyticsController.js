const { getNumOfTasksPerProjectService, getNumOfCompletedTasksPerProjectService, getNumOfTeamsPerProjectService, getProjectTaskDataService } = require("../services/analyticsService")
const { getAllProjectsService, getProjectByIdService } = require("../services/projectsService")

const getAnalytics = async (req, res) => {
    const projects = await getAllProjectsService()
    const analyticsData = await Promise.all(projects.map(async (project) => {
        const numOfTasks = await getNumOfTasksPerProjectService(project._id)
        const numOfCompletedTasks = await getNumOfCompletedTasksPerProjectService(project._id)
        const numOfTeams = await getNumOfTeamsPerProjectService(project._id)
        return {
            projectId: project._id,
            projectName: project.title,
            numOfTasks,
            numOfCompletedTasks,
            numOfTeams
        }
    }))
    res.status(200).json({ message: 'Analytics data retrieved successfully', data: analyticsData })
}

const getProjectTaskData = async (req, res) => {
    const { projectId } = req.params
    const project = await getProjectByIdService(projectId)
    if (!project) {
        return res.status(404).json({ message: 'Project not found' })
    }
    const tasks = await getProjectTaskDataService(project)
    const data = {
        projectId,
        name: project.name,
        title: project.title,
        deadline: project.deadline,
        description: project.description,
        tasks
    }
    res.status(200).json({ message: 'Project task data retrieved successfully', data })
}


module.exports = {
    getAnalytics,
    getProjectTaskData
}