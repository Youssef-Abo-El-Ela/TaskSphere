const joi = require('joi')

const createTeamSchema = joi.object({
    name: joi.string().required(),
})

const updateTeamSchema = joi.object({
    name: joi.string(),
    members: joi.array().items(joi.string()),
    leader: joi.string()
}).or('name', 'members', 'leader')

const validateCreateTeam = (req, res, next) => {
    const { error } = createTeamSchema.validate(req.body)
    if (error) {
        throw next(new Error(`Validation error: ${error.details[0].message}`))
    }
    next()
}

const validateUpdateTeam = (req, res, next) => {
    const { error } = updateTeamSchema.validate(req.body)
    if (error) {
        throw next(new Error(`Validation error: ${error.details[0].message}`))
    }
    next()
}

module.exports = {
    validateCreateTeam,
    validateUpdateTeam
}