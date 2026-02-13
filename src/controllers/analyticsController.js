const { getNumOfTasksPerProjectService, getNumOfCompletedTasksPerProjectService, getNumOfTeamsPerProjectService, getProjectTaskDataService } = require("../services/analyticsService")
const { getAllProjectsService, getProjectByIdService } = require("../services/projectsService")
const fs = require('fs')

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
const exportAnalytics = async (req, res) => {
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

    fs.appendFile(`./reports/analyticsData_${new Date().toISOString().split('T')[0]}.json`, JSON.stringify(analyticsData, null, 2), (err) => {
        if (err) {
            console.error('Error writing analytics data to file:', err)
            return res.status(500).json({ message: 'Failed to export analytics data' })
        }
        res.status(200).json({ message: 'Analytics data exported successfully', data: analyticsData })
    })
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

const exportProjectTaskData = async (req, res) => {
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
    fs.appendFile(`./reports/projectTaskData_${projectId}_${new Date().toISOString().split('T')[0]}.json`, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing project task data to file:', err)
            return res.status(500).json({ message: 'Failed to export project task data' })
        }
    })
    res.status(200).json({ message: 'Project task data exported successfully', data })
}


module.exports = {
    getAnalytics,
    getProjectTaskData,
    exportAnalytics,
    exportProjectTaskData
}