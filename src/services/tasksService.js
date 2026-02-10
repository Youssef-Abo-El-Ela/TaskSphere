const { linkTaskToProjectInDb, getProjectByIdFromDb } = require("../repositories/projects")
const { addTaskToDb, getAllTasksDataForProjectFromDb } = require("../repositories/tasks")

const createTaskService = async (userId, projectId, title, description, deadline, assignedTo) => {
    if(deadline && new Date(deadline) < new Date()) {
        throw new Error('Deadline cannot be in the past')
    }
    const newTask = await addTaskToDb(userId, projectId, title, description, deadline, assignedTo)    
    await linkTaskToProjectInDb(projectId, newTask.id)
    return newTask
}

const getAllUserTasksForProjectService = async (userId, projectId) => {
    const project = await getProjectByIdFromDb(projectId)
    if (!project) {
        throw new Error('Project not found')
    }
    
    const tasksIds = project.tasks.map(task => task.id)    
    const userTasksData = await getAllTasksDataForProjectFromDb(tasksIds, userId)
    return userTasksData
}

module.exports = {
    createTaskService,
    getAllUserTasksForProjectService
}