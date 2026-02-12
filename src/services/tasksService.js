const Task = require("../models/postgresql/Tasks")
const { linkTaskToProjectInDb, getProjectByIdFromDb } = require("../repositories/projects")
const { addTaskToDb, getAllTasksDataForProjectFromDb } = require("../repositories/tasks")

const createTaskService = async (userId, projectId, title, description, deadline, assignedTo, teamId) => {
    if (deadline && new Date(deadline) < new Date()) {
        throw new Error('Deadline cannot be in the past')
    }
    const newTask = await addTaskToDb(userId, projectId, title, description, deadline, assignedTo, teamId)
    await linkTaskToProjectInDb(projectId, newTask.id)
    return newTask
}

const getAllUserTasksForProjectService = async (userId, projectId, teamId) => {
    const project = await getProjectByIdFromDb(projectId)
    if (!project) {
        throw new Error('Project not found')
    }

    const tasksIds = project.tasks.map(task => task.id)
    const userTasksData = await getAllTasksDataForProjectFromDb(tasksIds, userId)
    const userTeamTasksData = userTasksData.filter(task => task.assignedTeam === teamId)
    return userTeamTasksData
}

const unlinkTasksFromTeam = async (teamId) => {
    await Task.update({ assignedTeam: null }, { where: { assignedTeam: teamId } })
}
module.exports = {
    createTaskService,
    getAllUserTasksForProjectService,
    unlinkTasksFromTeam
}