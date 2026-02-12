const { getAllUserTasksForProjectService, createTaskService } = require("../services/tasksService")

const createTask = async (req, res) => {
    const { userId, projectId } = req.params
    const { title, description, deadline, assignedTo, teamId } = req.body

    const newTask = await createTaskService(userId, projectId, title, description, deadline, assignedTo, teamId)

    res.status(201).json({ message: 'Task created successfully', data: newTask })
}

const getAllAssignedTasksForProject = async (req, res) => {
    const { projectId, userId, teamId } = req.params
    if (!teamId) {
        return res.status(400).json({ message: 'teamId parameter is required' })
    }
    const userTasks = await getAllUserTasksForProjectService(userId, projectId, teamId)
    res.status(200).json({ message: 'Tasks for Project retrieved successfully', data: userTasks })
}

module.exports = {
    createTask,
    getAllAssignedTasksForProject
}