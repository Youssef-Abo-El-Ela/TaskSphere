const Project = require('../models/mongodb/Project.model')
const Team = require('../models/mongodb/Team.model')
const User = require('../models/mongodb/User.model')
const Task = require('../models/postgresql/Tasks')

const getNumOfTasksPerProjectService = async (projectId) => {

    const project = await Project.findById(projectId)
    if (!project) {
        throw new Error('Project not found')
    }
    const numOfTasks = project.tasks.length
    return numOfTasks
}

const getNumOfCompletedTasksPerProjectService = async (projectId) => {

    const project = await Project.findById(projectId)
    if (!project) {
        throw new Error('Project not found')
    }
    return Promise.all(project.tasks.map(async (task) => {
        const taskDetails = await Task.findByPk(task.id)
        return taskDetails.status === 'Done' ? 1 : 0
    })).then((results) => {
        const numOfCompletedTasks = results.reduce((acc, curr) => acc + curr, 0)        
        return numOfCompletedTasks
    })
}

const getNumOfTeamsPerProjectService = async (projectId) => {
    const project = await Project.findById(projectId)
    if (!project) {
        throw new Error('Project not found')
    }
    const numOfTeams = project.teams.length
    return numOfTeams
}

const getProjectTaskDataService = async (project) => {
    const taskData = await Promise.all(project.tasks.map(async (task) => {
        const taskDetails = await Task.findByPk(task.id)
        const assignedTeam = await Team.findOne({ _id: taskDetails.assignedTeam })
        const createdByUser = await User.findById(taskDetails.createdBy)
        const assignedToUser = await User.findById(taskDetails.assignedTo)
        return {
            title: taskDetails.title,
            description: taskDetails.description,
            assignedTeam: assignedTeam ? assignedTeam.name : null,
            createdBy: createdByUser ? createdByUser.name : null,
            taskId: task.id,
            status: taskDetails.status,
            assignedTo: assignedToUser ? assignedToUser.name : null,
            deadline: taskDetails.deadline,
            createdAt: taskDetails.createdAt,
        }
    }))
    return taskData
}

module.exports = {
    getNumOfTasksPerProjectService,
    getNumOfCompletedTasksPerProjectService,
    getNumOfTeamsPerProjectService,
    getProjectTaskDataService
}