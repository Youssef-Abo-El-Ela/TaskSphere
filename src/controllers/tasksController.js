const { getAllUserTasksForProjectService, createTaskService, updateTaskService, getTaskByIdService, deleteTaskService } = require("../services/tasksService")

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

const updateTask = async (req, res) => {
    const { taskId } = req.params
    const { title, description, status, deadline, assignedTo, teamId } = req.body
    await updateTaskService(taskId, title, description, status, deadline, assignedTo, teamId)
    res.status(200).json({ message: 'Task updated successfully' })
}

const getTaskById = async (req, res) => {
    const { taskId } = req.params
    const taskData = await getTaskByIdService(taskId)
    if (!taskData) {
        return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json({ message: 'Task retrieved successfully', data: taskData })
}

const deleteTask = async (req, res) => {
    const { taskId } = req.params
    await deleteTaskService(taskId)
    res.status(200).json({ message: 'Task deleted successfully' })
}
module.exports = {
    createTask,
    getAllAssignedTasksForProject,
    updateTask,
    getTaskById,
    deleteTask
}