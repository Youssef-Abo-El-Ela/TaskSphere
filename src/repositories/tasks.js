const { sequelize } = require("../config/sequelize")
const { Op } = require("sequelize")
const Task = require("../models/postgresql/Tasks")

const addTaskToDb = async (userId, projectId, title, description, deadline, assignedTo, teamId) => {
    const newTask = await Task.create({
        title,
        description,
        deadline,
        assignedTo,
        createdBy: userId,
        projectId,
        assignedTeam: teamId
    })
    return newTask

}

const getAllTasksDataForProjectFromDb = async (tasksIds, userId) => {
    const tasksData = await Task.findAll({
        where: {
            id: {
                [Op.in]: tasksIds
            },
            assignedTo: {
                [Op.contains]: [userId]
            }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    return tasksData
}

const getAllTeamTasksFromDb = async (teamId) => {
    const teamTasks = await Task.findAll({
        where: {
            assignedTeam: teamId,
        }, attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    return teamTasks
}

const updateTaskInDb = async (taskId, title, description, status, deadline, assignedTo, teamId) => {
    const updateData = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (status) updateData.status = status
    if (deadline) {
        updateData.deadline = deadline
    }
    if (assignedTo) updateData.assignedTo = assignedTo
    if (teamId) updateData.assignedTeam = teamId

    await Task.update(updateData, { where: { id: taskId } })
}

const getTaskByIdFromDb = async (taskId) => {
    const taskData = await Task.findOne({
        where: { id: taskId },
    })
    return taskData
}

const deleteTaskFromDb = async (taskId) => {
    await Task.destroy({ where: { id: taskId } })
}

module.exports = {
    addTaskToDb,
    getAllTasksDataForProjectFromDb,
    getAllTeamTasksFromDb,
    updateTaskInDb,
    getTaskByIdFromDb,
    deleteTaskFromDb
}