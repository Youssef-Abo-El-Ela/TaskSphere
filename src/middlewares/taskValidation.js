const joi = require('joi')

const createTaskSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().optional(),
    deadline: joi.date().optional(),
    assignedTo: joi.array().items(joi.string()).optional(),
    teamId: joi.string().optional()
})

const updateTaskSchema = joi.object({
    title: joi.string().optional(),
    description: joi.string().optional(),
    deadline: joi.date().optional(),
    status: joi.string().valid('To Do', 'In Progress', 'Done').optional(),
    assignedTo: joi.array().items(joi.string()).optional(),
    teamId: joi.string().optional()
})

const validateCreateTask = (req, res, next) => {
    const { error } = createTaskSchema.validate(req.body)
    if (error) {
        next(new Error(`Validation error: ${error.details[0].message}`))
    } else {
        next()
    }
}

const validateUpdateTask = (req, res, next) => {
    const { error } = updateTaskSchema.validate(req.body)
    if (error) {
        next(new Error(`Validation error: ${error.details[0].message}`))
    } else {
        next()
    }
}

module.exports = {
    validateCreateTask,
    validateUpdateTask
}