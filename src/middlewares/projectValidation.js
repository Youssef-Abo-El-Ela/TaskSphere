const joi = require('joi')


const createProjectSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().optional(),
    deadline: joi.date().required(),
    teamId: joi.string().optional()
})

const updateProjectSchema = joi.object({
    title: joi.string().optional(),
    description: joi.string().optional(),
    deadline: joi.date().optional(),
    teamsIds: joi.array().items(joi.string())
})

const validateCreateProject = (req, res, next) => {
    const { error } = createProjectSchema.validate(req.body)
    if (error) {
        next(new Error(`Validation error: ${error.details[0].message}`))
    } else {
        next()
    }
}

const validateUpdateProject = (req, res, next) => {
    const { error } = updateProjectSchema.validate(req.body)
    if (error) {
        next(new Error(`Validation error: ${error.details[0].message}`))
    } else {
        next()
    }
}

module.exports = {
    validateCreateProject,
    validateUpdateProject
}