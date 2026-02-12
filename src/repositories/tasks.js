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

module.exports = {
    addTaskToDb,
    getAllTasksDataForProjectFromDb,
    getAllTeamTasksFromDb
}