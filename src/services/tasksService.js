const Task = require("../models/postgresql/Tasks")
const { linkTaskToProjectInDb, getProjectByIdFromDb, unlinkTasksFromProject } = require("../repositories/projects")
const { addTaskToDb, getAllTasksDataForProjectFromDb, updateTaskInDb, getTaskByIdFromDb, deleteTaskFromDb } = require("../repositories/tasks")
const { getTeamByIdFromDb } = require("../repositories/teams")
const { getUserByIdFromDb } = require("../repositories/users")

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
    const usersAssignedToTasksData = await Promise.all(userTeamTasksData.map(async (task) => {
        if (task.assignedTo && task.assignedTo.length > 0) {
            const assignedToUsersData = await Promise.all(task.assignedTo.map(userId => getUserByIdFromDb(userId)))
            task.assignedTo = assignedToUsersData.map(user => user ? user.name : null)
        }
        return task
    }))
    return usersAssignedToTasksData
}

const updateTaskService = async (taskId, title, description, status, deadline, assignedTo, teamId) => {
    if (deadline) {
        if (new Date(deadline) < new Date()) {
            throw new Error('Deadline cannot be in the past')
        }
    }
    await updateTaskInDb(taskId, title, description, status, deadline, assignedTo, teamId)
}

const getTaskByIdService = async (taskId) => {
    const taskData = await getTaskByIdFromDb(taskId)
    if (!taskData) {
        return null
    }
    if (taskData.assignedTeam) {
        const team = await getTeamByIdFromDb(taskData.assignedTeam)
        taskData.dataValues.assignedTeam = team ? team.name : null
    }
    if (taskData.projectId) {
        const project = await getProjectByIdFromDb(taskData.projectId)
        taskData.dataValues.project = project ? project.title : null
    }
    if (taskData.createdBy) {
        const user = await getUserByIdFromDb(taskData.createdBy)
        taskData.dataValues.createdBy = user ? user.name : null
    }
    if (taskData.assignedTo && taskData.assignedTo.length > 0) {
        const assignedToUsersData = await Promise.all(taskData.assignedTo.map(userId => getUserByIdFromDb(userId)))
        taskData.dataValues.assignedTo = assignedToUsersData.map(user => user ? user.name : null)
    }
    return {
        ...taskData.dataValues
    }
}

const unlinkTasksFromTeam = async (teamId) => {
    await Task.update({ assignedTeam: null }, { where: { assignedTeam: teamId } })
}

const deleteTaskService = async (taskId) => {
    await deleteTaskFromDb(taskId)
    await unlinkTasksFromProject(taskId)
}

module.exports = {
    createTaskService,
    getAllUserTasksForProjectService,
    unlinkTasksFromTeam,
    updateTaskService,
    getTaskByIdService,
    deleteTaskService
}