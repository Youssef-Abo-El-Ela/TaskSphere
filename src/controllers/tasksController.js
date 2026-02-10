const { getAllUserTasksForProjectService, createTaskService } = require("../services/tasksService")

const createTask = async (req, res) => {
    const { userId, projectId } = req.params
    const { title, description, deadline, assignedTo } = req.body

    const newTask = await createTaskService(userId, projectId, title, description, deadline, assignedTo)

    res.status(201).json({ message: 'Task created successfully', data: newTask })
}

const getAllAssignedTasksForProject = async (req, res) => {
    const { projectId, userId } = req.params
    const userTasks = await getAllUserTasksForProjectService(userId, projectId)
    res.status(200).json({ message: 'Tasks for Project retrieved successfully', data: userTasks })
}

module.exports = {
    createTask,
    getAllAssignedTasksForProject
}